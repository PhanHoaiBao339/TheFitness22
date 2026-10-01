import { StaticService } from './../static.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private total_quantity_root = new BehaviorSubject(
    this.cookieService.get('total_quantity')
  );
  private total_price_root = new BehaviorSubject(
    this.cookieService.get('total_price')
  );
  private ShopCartList_root = new BehaviorSubject(
    JSON.parse(this.cookieService.get('listCartShop'))
  );
  private cart_empty_root = new BehaviorSubject<boolean>(true);

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private staticService: StaticService
  ) {}

  public total_quantity = this.total_quantity_root.asObservable();
  public total_price = this.total_price_root.asObservable();
  public ShopCartList = this.ShopCartList_root.asObservable();

  public checkProductInCart(
    id: string,
    quantity: number,
    flavorOrColor: string,
    size: string
  ) {
    let listCartShop: any = [];
    listCartShop = JSON.parse(this.cookieService.get('listCartShop'));
    if (listCartShop.length == 0) {
      this.addProductToCart(id, quantity, flavorOrColor, size);
    } else {
      let check = true;
      for (let i = 0; i < listCartShop.length; i++) {
        const element = listCartShop[i];
        if (size != '') {
          if (
            element.product.id == id &&
            element.flavororcolor == flavorOrColor &&
            element.size == size
          ) {
            check = false;
            element.quantity += quantity;
            element.totalprice += quantity * element.product.price;
            this.upCookie(
              'listCartShop',
              JSON.stringify(listCartShop, null, 2)
            );
            this.ShopCartList_root.next(
              JSON.parse(this.cookieService.get('listCartShop'))
            );
            this.calculateTotal();
            break;
          }
        } else {
          if (
            element.product.id == id &&
            element.flavororcolor == flavorOrColor
          ) {
            check = false;
            element.quantity += quantity;
            element.totalprice += quantity * element.product.price;
            this.upCookie(
              'listCartShop',
              JSON.stringify(listCartShop, null, 2)
            );
            this.ShopCartList_root.next(
              JSON.parse(this.cookieService.get('listCartShop'))
            );
            this.calculateTotal();
            break;
          }
        }
      }
      if (check) {
        this.addProductToCart(id, quantity, flavorOrColor, size);
      }
    }
  }

  public changeQuantity(
    id: string,
    quantity: number,
    flavorOrColor: string,
    size: string
  ) {
    let listCartShop = JSON.parse(this.cookieService.get('listCartShop'));
    for (let i = 0; i < listCartShop.length; i++) {
      const element = listCartShop[i];
      if (size != '') {
        if (
          element.product.id == id &&
          element.flavororcolor == flavorOrColor &&
          element.size == size
        ) {
          element.quantity = quantity;
          element.totalprice = quantity * element.product.price;
          this.upCookie('listCartShop', JSON.stringify(listCartShop, null, 2));
          this.ShopCartList_root.next(
            JSON.parse(this.cookieService.get('listCartShop'))
          );
          this.calculateTotal();
          break;
        }
      } else {
        if (
          element.product.id == id &&
          element.flavororcolor == flavorOrColor
        ) {
          element.quantity = quantity;
          element.totalprice = quantity * element.product.price;
          this.upCookie('listCartShop', JSON.stringify(listCartShop, null, 2));
          this.ShopCartList_root.next(
            JSON.parse(this.cookieService.get('listCartShop'))
          );
          this.calculateTotal();
          break;
        }
      }
    }
  }

  public checkCartEmpty(): Observable<boolean> {
    let listCartShop = JSON.parse(this.cookieService.get('listCartShop'));
    if (listCartShop.length != 0) {
      this.cart_empty_root.next(false);
      return this.cart_empty_root.asObservable();
    } else {
      this.cart_empty_root.next(true);
      return this.cart_empty_root.asObservable();
    }
  }

  public addProductToCart(
    id: string,
    quantity: number,
    flavorOrColor: string,
    size: string
  ) {
    let listCartShop = JSON.parse(this.cookieService.get('listCartShop'));
    this.getProductCart(id).subscribe((resp) => {
      let cartshop: object = {
        product: resp,
        quantity: quantity,
        flavororcolor: flavorOrColor,
        size: size,
        totalprice: resp.price * quantity,
      };
      listCartShop.push(cartshop);
      this.upCookie('listCartShop', JSON.stringify(listCartShop, null, 2));
      this.ShopCartList_root.next(
        JSON.parse(this.cookieService.get('listCartShop'))
      );
      this.calculateTotal();
      alert('Successfully added to your cart! ')
    });
  }

  private calculateTotal() {
    let listCartShop = JSON.parse(this.cookieService.get('listCartShop'));
    let total_price: number = 0;
    let total_quantity: number = 0;
    listCartShop.forEach(
      (element: { totalprice: number; quantity: number }) => {
        total_price += element.totalprice;
        total_quantity += element.quantity;
      }
    );
    this.upCookie('total_price', total_price + '');
    this.upCookie('total_quantity', total_quantity + '');
    this.total_price_root.next(this.cookieService.get('total_price'));
    this.total_quantity_root.next(this.cookieService.get('total_quantity'));
  }

  private upCookie(name: string, value: string) {
    if (this.cookieService.check(name)) {
      this.cookieService.delete(name);
      this.cookieService.set(name, value, 5, '/');
    } else {
      this.cookieService.set(name, value, 5, '/');
    }
  }

  public getProductCart(id: string): Observable<any> {
    const ApiUrl = '/rest/products/forcart';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + '/' + id,
      httpOptions
    );
  }

  public deleteProductToCart(index: number) {
    let listCartShopCookie = JSON.parse(this.cookieService.get('listCartShop'));
    if (index > -1) {
      listCartShopCookie.splice(index, 1);
    }
    this.upCookie('listCartShop', JSON.stringify(listCartShopCookie, null, 2));
    this.ShopCartList_root.next(
      JSON.parse(this.cookieService.get('listCartShop'))
    );
    this.calculateTotal();
  }

  public cleanShoppingCart() {
    this.upCookie('listCartShop', JSON.stringify([], null, 2));
    this.upCookie('total_price', '0');
    this.upCookie('total_quantity', '0');
    this.total_price_root.next(this.cookieService.get('total_price'));
    this.total_quantity_root.next(this.cookieService.get('total_quantity'));
    this.ShopCartList_root.next(
      JSON.parse(this.cookieService.get('listCartShop'))
    );
  }
}
