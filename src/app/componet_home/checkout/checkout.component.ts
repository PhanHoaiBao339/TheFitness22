import { BehaviorSubject } from 'rxjs';
import { LayoutComponent } from './../layout/layout.component';
import { OrderAndOrderdetailService } from './../../service/user-page/order-and-orderdetail.service';
import { ShoppingCartService } from './../../service/user-page/shopping-cart.service';
import { AuthService } from './../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../layout/layout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private layoutComponent: LayoutComponent,
    private shoppingCartService: ShoppingCartService,
    private orderAndOrderdetailService: OrderAndOrderdetailService
  ) {}

  private load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public total_quantity: any;
  public total_price: any;
  public ShopCartList: any = [];
  public username = '';
  public fullname = '';
  public email = '';
  public phoneNo = '';
  public address = '';
  public note = '';
  public paymentMethod = '';
  public sendAcc = false;

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
    this.checkUserLogin();
  }

  private checkUserLogin() {
    this.authService.isLoggedSuccess().subscribe((data) => {
      if (data) {
        this.authService
          .getLoggedUsername()
          .subscribe((value) => (this.username = value));
        this.authService
          .getLoggedFullname()
          .subscribe((value) => (this.fullname = value));
        this.authService
          .getLoggedEmail()
          .subscribe((value) => (this.email = value));
        this.authService
          .getLoggedPhone()
          .subscribe((value) => (this.phoneNo = value));
        this.authService
          .getLoggedAddress()
          .subscribe((value) => (this.address = value));
      }
    });
  }

  public placeOrder() {
    if (
      this.email == '' ||
      this.fullname == '' ||
      this.address == '' ||
      this.phoneNo == '' ||
      this.paymentMethod == '' ||
      this.ShopCartList.length == 0
    ) {
      if (this.ShopCartList.length == 0) {
        alert('Your shoping cart IS EMPTY!');
      } else {
        alert('Please complete all information!');
      }
    } else {
      this.load.asObservable().subscribe((data) => {
        this.layoutComponent.loading(data);
      });
      this.authService
        .isLoggedSuccess()
        .subscribe((data) => {
          if (!data) {
            let a = this.authService.registerGuest(
              this.email,
              this.fullname,
              this.phoneNo,
              this.address,
              this.sendAcc
            );
            setTimeout(() => {
              let username = this.authService.registerUsernameGuest.getValue();
              if (username != '') {
                this.orderAndOrderdetailService
                  .saveOrder(
                    username,
                    this.fullname,
                    this.address,
                    this.phoneNo,
                    this.note,
                    this.paymentMethod
                  )
                  .subscribe((value1) => {
                    let ShopCartList = JSON.parse(
                      this.cookieService.get('listCartShop')
                    );
                    this.orderAndOrderdetailService
                      .saveOrderDetail(value1, ShopCartList)
                      .subscribe((value) => {
                        this.load.next(false);
                        if (value.status) {
                          alert(value.message);
                          this.shoppingCartService.cleanShoppingCart();
                          this.ResetCheckout();
                        } else {
                          alert(value.message);
                        }
                      });
                  });
              }
              // this.authService.getRegisterUsernameGuest().subscribe((value) => {

              // });
            }, 2000);
          } else {
            this.orderAndOrderdetailService
              .saveOrder(
                this.username,
                this.fullname,
                this.address,
                this.phoneNo,
                this.note,
                this.paymentMethod
              )
              .subscribe((value2) => {
                let ShopCartList = JSON.parse(
                  this.cookieService.get('listCartShop')
                );
                this.orderAndOrderdetailService
                  .saveOrderDetail(value2, ShopCartList)
                  .subscribe((value) => {
                    this.load.next(false);
                    alert(value.message);
                    if (value.status) {
                      this.shoppingCartService.cleanShoppingCart();
                      this.ResetCheckout();
                    }
                  });
              });
          }
        })
        .unsubscribe();
    }
  }

  private createAccountGuest() {}

  private ResetCheckout() {
    this.fullname = '';
    this.email = '';
    this.phoneNo = '';
    this.address = '';
    this.paymentMethod = '';
    this.note = '';
  }
}
