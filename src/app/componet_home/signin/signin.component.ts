import { Router } from '@angular/router';
import { StaticService } from './../../service/static.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private staticService: StaticService
  ) {}

  public isLoginMessageAccept$: Observable<string> = new Observable<string>();
  public isLoginMessageError$: Observable<string> = new Observable<string>();
  public isRegisterUsername$: Observable<string> = new Observable<string>();
  public username: any;
  public password: any;
  public remember: boolean = false;
  public rootUrl = this.staticService.rootUrl;
  public isDisable: boolean = false;
  public isSuccess: boolean = true;

  ngOnInit(): void {
    this.isLoginMessageAccept$ = this.authService.getLoginMessageAccept();
    this.isLoginMessageError$ = this.authService.getLoginMessageError();
    this.isRegisterUsername$ = this.authService.getRegisterUsername();
    this.isRegisterUsername$.subscribe((data) => {
      this.username = data;
    });
    this.checkRemeber();
  }

  public checkRemeber() {
    if (localStorage.getItem('account') != null) {
      let acc: string = localStorage.getItem('account') || '';
      let account = JSON.parse(acc);
      this.username = account.username;
      this.password = account.password;
      this.remember = account.remember;
    }
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

  public login() {
    this.isDisable = true;
    this.isSuccess = true;
    this.authService.ResetMessage();
    this.authService.login(this.username, this.password, this.remember);
    this.authService.getLoginMessageAccept().subscribe((data) => {
      if (data != '') {
        this.isSuccess = false;
      }
    });
    this.authService.getLoginMessageError().subscribe((data) => {
      if (data != '') {
        this.isDisable = false;
      }
    });
  }

  public loginGoogle() {}
}
