import { AuthService } from './service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WebFitness';
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
    ) {}

    ngOnInit(): void {
      if (!this.cookieService.check('total_quantity')) {
        this.cookieService.set('total_quantity','0',5, '/');
      };
      if (!this.cookieService.check('total_price')) {
        this.cookieService.set('total_price','0',5, '/');
      };
      if (!this.cookieService.check('listCartShop')) {
        this.cookieService.set('listCartShop',JSON.stringify(new Array()),5, '/');
      };
      this.authService.checkRemeberLogin();
    }



}
