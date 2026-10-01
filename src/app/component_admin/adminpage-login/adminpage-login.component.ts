import { Router } from '@angular/router';
import { AdminLayoutComponent } from './../admin-layout/admin-layout.component';
import { Observable } from 'rxjs';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpage-login',
  templateUrl: './adminpage-login.component.html',
  styleUrls: ['./adminpage-login.component.scss'],
})
export class AdminpageLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private adminLayoutComponent: AdminLayoutComponent
  ) {}
  public isLoginMessageAccept$: Observable<string> = new Observable<string>();
  public isLoginMessageError$: Observable<string> = new Observable<string>();
  public isRegisterUsername$: Observable<string> = new Observable<string>();
  public isDisable: boolean = false;
  public isSuccess: boolean = true;
  public username: string = '';
  public password: string = '';
  public remember: boolean = false;

  ngOnInit(): void {
    this.authService.logout();
    this.isLoginMessageAccept$ = this.authService.getLoginMessageAccept();
    this.isLoginMessageError$ = this.authService.getLoginMessageError();
    this.checkRemeber();
  }

  public checkRemeber() {
    if (localStorage.getItem('adminAccount') != null) {
      let acc: string = localStorage.getItem('adminAccount') || '';
      let account = JSON.parse(acc);
      this.username = account.username;
      this.password = account.password;
      this.remember = account.remember;
    }
  }

  public login() {
    this.isDisable = true;
    this.isSuccess = true;
    this.authService.ResetMessage();
    this.authService.loginAdminPage(
      this.username,
      this.password,
      this.remember
    );
    this.isLoginMessageError$.subscribe((data) => {
      if (data != '') {
        this.isDisable = false;
      }
    });
    this.isLoginMessageAccept$.subscribe((data) => {
      if (data != '') {
        this.isSuccess = false;
        this.adminLayoutComponent.changeTitlePage('Dashboard');
        setTimeout(() => this.router.navigate(['/admin/dashboard']), 500);
      }
    });
  }

  public changeRemember() {
    if (this.remember) {
      document.getElementById('remember')?.classList.add('text-primary');
    } else {
      document.getElementById('remember')?.classList.remove('text-primary');
    }
  }

  public rememberClick() {
    document.getElementById('rememberInput')?.click();
  }
}
