import { AuthService } from './service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { };
  private admin: any;
  private dire: any;
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    this.authService.isLoggedAdmin().subscribe(value => {
      this.admin = value;
    })
    this.authService.isLoggedDire().subscribe(value => {
      this.dire = value;
    })

    this.authService.Forbidden();

    if (this.admin || this.dire) {
      return true;
    }else{
      this.router.navigate(['/admin/login']);
      return false;
    }




  }

}
