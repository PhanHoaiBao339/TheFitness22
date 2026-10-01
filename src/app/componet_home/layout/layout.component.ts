import { Router } from '@angular/router';
import { StaticService } from './../../service/static.service';
import { ShoppingCartService } from './../../service/user-page/shopping-cart.service';
import { Observable } from 'rxjs';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private staticService: StaticService,
    private shoppingCartService: ShoppingCartService
  ) {}

  public isLoggedSuccess$: Observable<boolean> = new Observable<boolean>();
  public isLoggedAdmin$: Observable<boolean> = new Observable<boolean>();
  public isLoggedDire$: Observable<boolean> = new Observable<boolean>();
  public isLoggedUsername$: Observable<string> = new Observable<string>();
  public isLoggedFullname$: Observable<string> = new Observable<string>();
  public isLoggedPhoto: Observable<string> = new Observable<string>();
  public imageProductUrl: string =
    this.staticService.rootUrl + '/downloadFile/products/';
  public imageAccountUrl: string =
    this.staticService.rootUrl + '/downloadFile/account/';
  public total_quantity: any;
  public total_price: any;
  public ShopCartList: any = [];
  public username: any;
  public fullnameofuser: Observable<string> = new Observable<string>();

  ngOnInit(): void {
    this.sidebarSearch();
    this.mobileMenu();
    this.checkLogin();
    this.checkShoppingCart();
    this.js();
  }

  private checkShoppingCart() {
    this.shoppingCartService.total_price.subscribe(
      (data) => (this.total_price = data)
    );
    this.shoppingCartService.total_quantity.subscribe(
      (data) => (this.total_quantity = data)
    );
    this.shoppingCartService.ShopCartList.subscribe(
      (data) => (this.ShopCartList = data)
    );
  }

  private checkLogin() {
    this.isLoggedSuccess$ = this.authService.isLoggedSuccess();
    this.isLoggedUsername$ = this.authService.getLoggedUsername();
    this.isLoggedAdmin$ = this.authService.isLoggedAdmin();
    this.isLoggedDire$ = this.authService.isLoggedDire();
    this.isLoggedFullname$ = this.authService.getLoggedFullname();
    this.isLoggedPhoto = this.authService.getLoggedPhoto();
    this.isLoggedFullname$.subscribe((data) => {
      if (data == null) {
        this.fullnameofuser = this.authService.getLoggedUsername();
      } else {
        this.fullnameofuser = this.authService.getLoggedFullname();
      }
    });
    this.authService.ResetMessage();
  }

  public logout() {
    this.authService.logout();
    // this.router.navigate(['/home']);
    window.location.reload();
  }

  public removeProcuctInCart(index: number) {
    this.shoppingCartService.deleteProductToCart(index);
  }

  public sidebarSearch() {
    var searchTrigger = $('.header-search-toggle'),
      endTriggersearch = $('button.search-close'),
      container = $('.main-search-active');
    searchTrigger.on('click', function () {
      container.addClass('inside');
    });
    endTriggersearch.on('click', function () {
      container.removeClass('inside');
    });
  }

  public loading(on: boolean) {
    var container = $('.main-loading-active');
    if (on) {
      container.addClass('inside');
    } else {
      container.removeClass('inside');
    }
  }

  public CleanAllCart() {
    this.shoppingCartService.cleanShoppingCart();
  }

  private mobileMenu() {
    var searchTrigger = $('.mobile-menu-toggle'),
      endTriggersearch = $('button.mobile-menu-close'),
      container = $('.mobile-menu-active');
    searchTrigger.on('click', function () {
      container.addClass('inside');
    });
    endTriggersearch.on('click', function () {
      container.removeClass('inside');
    });
  }

  private js() {
    $('.site-mobile-menu').on('click', '.menu-toggle', function (e) {
      e.preventDefault();
      var $this = $(this);
      if ($this.siblings('.sub-menu:visible, .mega-menu:visible').length) {
        $this
          .siblings('.sub-menu, .mega-menu')
          .slideUp()
          .parent()
          .removeClass('open')
          .find('.sub-menu, .mega-menu')
          .slideUp()
          .parent()
          .removeClass('open');
      } else {
        $this
          .siblings('.sub-menu, .mega-menu')
          .slideDown()
          .parent()
          .addClass('open')
          .siblings()
          .find('.sub-menu, .mega-menu')
          .slideUp()
          .parent()
          .removeClass('open');
      }
    });

    var $scrollUp = $('#scroll-top'),
      $lastScrollTop = 0,
      $window = $(window);

    $window.on('scroll', function () {
      var st = $(this).scrollTop()!;
      if (st > $lastScrollTop) {
        $scrollUp.removeClass('show');
      } else {
        if ($window.scrollTop()! > 200) {
          $scrollUp.addClass('show');
        } else {
          $scrollUp.removeClass('show');
        }
      }
      $lastScrollTop = st;
    });

    $scrollUp.on('click', function (evt) {
      $('html, body').animate({ scrollTop: 0 }, 100);
      evt.preventDefault();
    });
  }
}
