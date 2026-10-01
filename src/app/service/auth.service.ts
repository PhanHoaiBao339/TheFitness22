import { AdminpageLoginComponent } from './../component_admin/adminpage-login/adminpage-login.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StaticService } from './static.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { SendEmailService } from './user-page/send-email.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private location: Location,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private staticService: StaticService,
    private sendEmailService: SendEmailService,
    private jwtHelperService: JwtHelperService
  ) {}

  public registerUsernameGuest: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private registerMessageAccept: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private registerMessageUsernameError: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private registerMessageEmailError: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private registerUsername: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private logginSuccess: boolean = false;
  private loggedSuccess: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private registerSuccess: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private loggedAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private loggedDire: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private checkUsernameForgot: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private loggedToken: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private loggedUsername: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private loggedFullname: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private loggedEmail: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private loggedPhone: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private loggedAddress: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private loggedGender: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  private loggedBirthday: BehaviorSubject<Date> = new BehaviorSubject<Date>(
    new Date()
  );
  private loggedPhoto: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private loginMessageAccept: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private loginMessageError: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private forgotMessageAccept: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private forgotMessageError: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private confirmCodeResp: AsyncSubject<string> = new AsyncSubject<string>();

  //Get===================================================================================
  public isLoggedSuccess(): Observable<boolean> {
    return this.loggedSuccess.asObservable();
  }
  public isRegisterSuccess(): Observable<boolean> {
    return this.registerSuccess.asObservable();
  }
  public isLoggedAdmin(): Observable<boolean> {
    return this.loggedAdmin.asObservable();
  }
  public isLoggedDire(): Observable<boolean> {
    return this.loggedDire.asObservable();
  }
  public isUsernameForgot(): Observable<boolean> {
    return this.checkUsernameForgot.asObservable();
  }

  public getLoggedToken(): Observable<string> {
    return this.loggedToken.asObservable();
  }
  public getLoggedUsername(): Observable<string> {
    return this.loggedUsername.asObservable();
  }
  public getLoggedFullname(): Observable<string> {
    return this.loggedFullname.asObservable();
  }
  public getLoggedEmail(): Observable<string> {
    return this.loggedEmail.asObservable();
  }
  public getLoggedPhone(): Observable<string> {
    return this.loggedPhone.asObservable();
  }
  public getLoggedAddress(): Observable<string> {
    return this.loggedAddress.asObservable();
  }
  public getLoggedPhoto(): Observable<string> {
    return this.loggedPhoto.asObservable();
  }
  public getLoggedGender(): Observable<boolean> {
    return this.loggedGender.asObservable();
  }

  public getLoginMessageAccept(): Observable<string> {
    return this.loginMessageAccept.asObservable();
  }
  public getLoginMessageError(): Observable<string> {
    return this.loginMessageError.asObservable();
  }
  public getForgotMessageAccept(): Observable<string> {
    return this.forgotMessageAccept.asObservable();
  }
  public getForgotMessageError(): Observable<string> {
    return this.forgotMessageError.asObservable();
  }
  public getRegisterMessageAccept(): Observable<string> {
    return this.registerMessageAccept.asObservable();
  }
  public getRegisterMessageUsernameError(): Observable<string> {
    return this.registerMessageUsernameError.asObservable();
  }
  public getRegisterMessageEmailError(): Observable<string> {
    return this.registerMessageEmailError.asObservable();
  }
  public getRegisterUsername(): Observable<string> {
    return this.registerUsername.asObservable();
  }
  public getRegisterUsernameGuest(): Observable<string> {
    return this.registerUsernameGuest.asObservable();
  }
  public getConfirmCodeResp(): Observable<string> {
    return this.confirmCodeResp.asObservable();
  }

  //Method===================================================================================
  public login(username: string, password: string, remember: boolean) {
    if (username != '' && password != '') {
      this.callLoginRequest(username, password).subscribe((resp) => {
        if (resp.message == 'Successfully') {
          this.logginSuccess = true;
          this.loggedSuccess.next(true);
          this.loginMessageError.next('');
          this.loginMessageAccept.next('Logged in successfully!');
          this.loggedToken.next(resp.token);
          this.loggedFullname.next(resp.fullname);
          this.loggedUsername.next(resp.username);
          this.loggedEmail.next(resp.email);
          this.loggedPhone.next(resp.phone);
          this.loggedAddress.next(resp.address);
          this.loggedGender.next(resp.gender);
          // this.loggedBirthday.next(resp.birthday);
          this.loggedPhoto.next(resp.photo);
          this.registerUsername.next('');
          this.cookieService.set('LoginTOKEN', resp.token, 1);
          if (remember) {
            localStorage.setItem(
              'account',
              JSON.stringify({
                username: username,
                password: password,
                remember: remember,
              })
            );
          } else {
            localStorage.removeItem('account');
          }
          resp.role.forEach((element: any) => {
            switch (element) {
              case 'ROLE_ADMIN':
                this.loggedAdmin.next(true);
                break;
              case 'ROLE_DIRE':
                this.loggedDire.next(true);
                break;
            }
          });
          // setTimeout(() => this.router.navigate(['/home']), 1000);
          setTimeout(() => this.location.back(), 1000);
        } else if (resp.message != 'Error') {
          this.loginMessageError.next('Your account not Active!');
        } else {
          this.loginMessageError.next('Your account or password is incorrect!');
        }
      });
    } else {
      this.loginMessageError.next('Enter your Username & Password!');
    }
  }

  public loginAdminPage(username: string, password: string, remember: boolean) {
    if (password == '' || username == '') {
      this.loginMessageError.next('Please enter username and password!');
    } else {
      this.callLoginRequest(username, password).subscribe((resp) => {
        if (resp.message == 'Successfully') {
          this.logginSuccess = true;
          this.loggedSuccess.next(true);
          this.loginMessageError.next('');
          this.loginMessageAccept.next('Logged in successfully!');
          this.loggedToken.next(resp.token);
          this.loggedFullname.next(resp.fullname);
          this.loggedUsername.next(resp.username);
          this.loggedEmail.next(resp.email);
          this.loggedPhone.next(resp.phone);
          this.loggedAddress.next(resp.address);
          // this.loggedGender.next(resp.gender);
          // this.loggedBirthday.next(resp.birthday);
          this.loggedPhoto.next(resp.photo);
          if (remember) {
            localStorage.setItem(
              'adminAccount',
              JSON.stringify({
                username: username,
                password: password,
                remember: remember,
              })
            );
          } else {
            localStorage.removeItem('adminAccount');
          }
          resp.role.forEach((element: any) => {
            switch (element) {
              case 'ROLE_ADMIN':
                this.loggedAdmin.next(true);
                break;
              case 'ROLE_DIRE':
                this.loggedDire.next(true);
                break;
            }
          });
        } else {
          this.loginMessageError.next('Your account or password is incorrect!');
        }
      });
    }
  }

  public autoLoginByToken(token: string) {
    this.callAutoLoginResponse(token).subscribe((resp) => {
      if (resp.message == 'Successfully') {
        this.logginSuccess = true;
        this.loggedSuccess.next(true);
        this.loggedToken.next(resp.token);
        this.loggedFullname.next(resp.fullname);
        this.loggedUsername.next(resp.username);
        this.loggedEmail.next(resp.email);
        this.loggedPhone.next(resp.phone);
        this.loggedAddress.next(resp.address);
        // this.loggedGender.next(resp.gender);
        // this.loggedBirthday.next(resp.birthday);
        this.loggedPhoto.next(resp.photo);
        resp.role.forEach((element: any) => {
          switch (element) {
            case 'ROLE_ADMIN':
              this.loggedAdmin.next(true);
              break;
            case 'ROLE_DIRE':
              this.loggedDire.next(true);
              break;
          }
        });
      }
    });
  }

  private callAutoLoginResponse(token: string): Observable<any> {
    const ApiUrl = '/api/auth/autosignin';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      token,
      httpOptions
    );
  }

  public checkRemeberLogin() {
    if (!this.logginSuccess) {
      if (this.cookieService.check('LoginTOKEN')) {
        let token = this.cookieService.get('LoginTOKEN');
        let expired = this.jwtHelperService.isTokenExpired(token);
        if (!expired) {
          this.autoLoginByToken(token);
        } else {
          this.cookieService.delete('LoginTOKEN');
        }
      }
    }
  }

  private callLoginRequest(
    usernameOrEmail: string,
    password: string
  ): Observable<any> {
    let expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    let loginRequest;
    if (expression.test(usernameOrEmail)) {
      loginRequest = {
        username: 'none',
        password: password,
        email: usernameOrEmail,
      };
    } else {
      loginRequest = {
        username: usernameOrEmail,
        password: password,
        email: 'none',
      };
    }

    const ApiUrl = '/api/auth/signin';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      loginRequest,
      httpOptions
    );
  }

  public logout() {
    this.logginSuccess = false;
    this.loggedSuccess.next(false);
    this.loggedAdmin.next(false);
    this.loggedDire.next(false);
    this.loggedUsername.next('');
    this.loggedFullname.next('');
    this.loggedEmail.next('');
    this.loggedPhone.next('');
    this.loggedAddress.next('');
    this.loginMessageAccept.next('');
    this.loginMessageError.next('');
    this.registerMessageAccept.next('');
    this.registerMessageUsernameError.next('');
    this.registerMessageEmailError.next('');
    this.registerUsername.next('');
    this.loggedPhoto.next('');
    this.cookieService.delete('LoginTOKEN');
    localStorage.removeItem('originalAccount');
    const ApiUrl = '/api/auth/logout';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let logout: Observable<any> = this.httpClient.get(
      this.staticService.rootUrl + ApiUrl,
      httpOptions
    );
    logout.subscribe((data) => {
      console.log(data.message);
    });
  }

  public Forbidden() {
    let authTrue = new BehaviorSubject<boolean>(true).asObservable;
    if (this.isLoggedAdmin != authTrue || this.isLoggedDire != authTrue) {
      this.loginMessageAccept.next('');
      this.loginMessageError.next('You do not have permission to access it!');
    } else {
      this.loginMessageError.next('');
      this.loginMessageAccept.next('Logged in successfully!');
    }
  }

  public register(username: string, email: string, password: string) {
    this.registerRequest(username, email, password).subscribe((resp) => {
      if (resp.status) {
        this.registerMessageAccept.next(resp.message);
        this.registerUsername.next(username);
        this.registerSuccess.next(true);
        setTimeout(() => this.router.navigate(['/login']), 1500);
      } else {
        this.registerMessageUsernameError.next(resp.message1);
        this.registerMessageEmailError.next(resp.message2);
      }
    });
  }

  public registerGuest(
    email: string,
    fullname: string,
    phone: string,
    address: string,
    sendAcc: boolean
  ): boolean {
    let check = false;
    this.createGuestRequest(email, fullname, phone, address, sendAcc).subscribe(
      (resp) => {
        let username = resp.usernameguest;
        console.log(username);
        this.registerUsernameGuest.next(username);
        this.registerUsernameGuest.asObservable().subscribe((data) => {
          console.log(data);
        });
        check = true;
        return check;
      }
    );
    return check;
  }

  private registerRequest(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    let registerRequest = {
      username: username,
      email: email,
      password: password,
    };
    const ApiUrl = '/api/auth/signup';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      registerRequest,
      httpOptions
    );
  }

  private createGuestRequest(
    email: string,
    fullname: string,
    phone: string,
    address: string,
    sendAcc: boolean
  ): Observable<any> {
    let registerRequest = {
      email: email,
      fullname: fullname,
      phone: phone,
      address: address,
      sendAcc: sendAcc,
    };
    const ApiUrl = '/api/auth/createguest';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      registerRequest,
      httpOptions
    );
  }

  public checkUsername(username: string, email: string) {
    let value = {
      username: username,
      email: email,
    };
    let emailDetail = {
      recipient: '',
      msgBody: '',
      subject: 'Request to Reset your password - ' + new Date(),
      username: username,
    };
    if (username == '' || email == '') {
      this.forgotMessageError.next('Please enter username and email!');
    } else {
      this.checkUsernameRequest(value).subscribe((data) => {
        this.checkUsernameForgot.next(data.status);
        if (data.status) {
          this.forgotMessageError.next('');
          this.forgotMessageAccept.next(data.message);
          emailDetail.recipient = email;
          this.sendEmailService.sendMail(emailDetail).subscribe((data) => {
            if (data.status) {
              this.confirmCodeResp.next(data.confirmcode);
              this.confirmCodeResp.complete();
              this.forgotMessageError.next('');
              this.forgotMessageAccept.next(data.message);
            } else {
              this.forgotMessageAccept.next('');
              this.forgotMessageError.next(data.message);
            }
          });
        } else {
          this.forgotMessageAccept.next('');
          this.forgotMessageError.next(data.message);
        }
      });
    }
  }

  private checkUsernameRequest(checkUsername: any): Observable<any> {
    const ApiUrl = '/api/auth/checkusername';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      checkUsername,
      httpOptions
    );
  }

  public changePassword(
    username: string,
    email: string,
    confirmCode: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    let accountChange = {
      username: username,
      email: email,
      password: newPassword,
    };

    this.getConfirmCodeResp().subscribe((data) => {
      if (confirmCode === data) {
        if (newPassword === confirmNewPassword) {
          this.changePasswordRequest(accountChange).subscribe((data) => {
            this.forgotMessageError.next('');
            this.forgotMessageAccept.next(data.message);
            this.confirmCodeResp.next('');
            this.confirmCodeResp.complete();
            this.checkUsernameForgot.next(false);
          });
        } else {
          this.forgotMessageAccept.next('');
          this.forgotMessageError.next("Confirm password doesn't match!");
        }
      } else {
        this.forgotMessageAccept.next('');
        this.forgotMessageError.next("Confirm Code doesn't match!");
      }
    });
  }

  private changePasswordRequest(accountChange: any): Observable<any> {
    const ApiUrl = '/api/auth/changepassword';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      accountChange,
      httpOptions
    );
  }

  public getAccountByUsername(account: string): Observable<any> {
    let token: string = '';
    this.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/accounts/admin/getone/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + account,
      httpOptions
    );
  }

  public ResetMessage() {
    this.loginMessageAccept.next('');
    this.loginMessageError.next('');
    this.registerMessageAccept.next('');
    this.registerMessageUsernameError.next('');
    this.registerMessageEmailError.next('');
    this.registerUsernameGuest.next('');
    this.forgotMessageAccept.next('');
    this.forgotMessageError.next('');
  }
}
