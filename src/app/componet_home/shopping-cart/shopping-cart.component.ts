import { StaticService } from './../../service/static.service';
import { ShoppingCartService } from './../../service/user-page/shopping-cart.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private shoppingCartService: ShoppingCartService,
    private staticService: StaticService
  ) {}

  public rootUrl: string =
    this.staticService.rootUrl + '/downloadFile/products/';
  public total_quantity: any;
  public total_price: any;
  public ShopCartList: any = [];
  public cartEmpty: any;

  ngOnInit(): void {
    this.shoppingCartService.total_price.subscribe(
      (data) => (this.total_price = data)
    );
    this.shoppingCartService.total_quantity.subscribe(
      (data) => (this.total_quantity = data)
    );
    this.shoppingCartService.ShopCartList.subscribe(
      (data) => (this.ShopCartList = data)
    );
    this.shoppingCartService
      .checkCartEmpty()
      .subscribe((data) => (this.cartEmpty = data));
  }

  public removeProcuctInCart(index: number) {
    this.shoppingCartService.deleteProductToCart(index);
    this.shoppingCartService
      .checkCartEmpty()
      .subscribe((data) => (this.cartEmpty = data));
  }

  public CleanAllCart() {
    this.shoppingCartService.cleanShoppingCart();
    this.shoppingCartService
      .checkCartEmpty()
      .subscribe((data) => (this.cartEmpty = data));
  }

  public changeSubTotal(product: any) {
    this.shoppingCartService.changeQuantity(
      product.product.id,
      product.quantity,
      product.flavororcolor,
      product.size
    );
  }

  public plusQuantity(itemCart: any, index: number) {
    var x = Number(
      (document.getElementById('quantity' + index) as HTMLInputElement).value
    );
    x += 1;
    (document.getElementById('quantity' + index) as HTMLInputElement).value =
      String(x);
    this.shoppingCartService.changeQuantity(
      itemCart.product.id,
      x,
      itemCart.flavororcolor,
      itemCart.size
    );
  }

  public minusQuantity(itemCart: any, index: number) {
    var x = Number(
      (document.getElementById('quantity' + index) as HTMLInputElement).value
    );
    if (x > 1) {
      x -= 1;
    } else {
      x = 1;
    }
    (document.getElementById('quantity' + index) as HTMLInputElement).value =
      String(x);
    this.shoppingCartService.changeQuantity(
      itemCart.product.id,
      x,
      itemCart.flavororcolor,
      itemCart.size
    );
  }
}
