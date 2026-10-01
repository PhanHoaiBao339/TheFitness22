import { Observable } from 'rxjs';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import Validation from './validation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.isCheckUsername$ = this.authService.isUsernameForgot();
    this.isForgotMessageAccept$ = this.authService.getForgotMessageAccept();
    this.isForgotMessageError$ = this.authService.getForgotMessageError();
  }

  public isCheckUsername$: Observable<boolean> = new Observable<boolean>();
  public isForgotMessageAccept$: Observable<string> = new Observable<string>();
  public isForgotMessageError$: Observable<string> = new Observable<string>();
  public username: string = '';
  public email: string = '';
  public confirmCode: string = '';
  // public newPassword: string = '';
  // public confirmNewPassword: string = '';
  public isDisable: boolean = false;
  public isSuccess: boolean = true;
  public inputReadonly: boolean = false;

  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  private validation() {
    this.form = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      let box = <HTMLElement>document.getElementById('boxforgot');
      box.style.height = '720px';
      this.changePassword();
      return;
    } else {
      let box = <HTMLElement>document.getElementById('boxforgot');
      box.style.height = '755px';
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public changePassword() {
    this.isDisable = true;
    this.isSuccess = true;
    this.inputReadonly = true;
    this.authService.ResetMessage();
    this.authService.changePassword(
      this.username,
      this.email,
      this.confirmCode,
      this.form.value.password,
      this.form.value.confirmPassword
    );
    this.authService.getForgotMessageAccept().subscribe((data) => {
      if (data != '') {
        this.isSuccess = false;
      }
    });
    this.authService.getForgotMessageError().subscribe((data) => {
      if (data != '') {
        this.isDisable = false;
        this.inputReadonly = false;
      }
    });
  }

  public getConfirmCode() {
    this.authService.checkUsername(this.username, this.email);
  }
}
