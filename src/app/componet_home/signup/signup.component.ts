import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import Validation from './validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  public isRegisterMessageAccept$: Observable<string> =
    new Observable<string>();
  public isRegisterMessageUsernameError$: Observable<string> =
    new Observable<string>();
  public isRegisterMessageEmailError$: Observable<string> =
    new Observable<string>();
  public isDisable: boolean = false;
  public isUsernameTaken: boolean = true;
  public isEmailTaken: boolean = true;
  public isSuccess: boolean = true;

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  ngOnInit(): void {
    this.validation();
    this.isRegisterMessageAccept$ = this.authService.getRegisterMessageAccept();
    this.isRegisterMessageUsernameError$ =
      this.authService.getRegisterMessageUsernameError();
    this.isRegisterMessageEmailError$ =
      this.authService.getRegisterMessageEmailError();
  }

  private validation() {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('[a-z0-9]*'),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
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
      this.register(
        this.form.value.username,
        this.form.value.email,
        this.form.value.password
      );
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  private register(username: string, email: string, password: string) {
    this.isDisable = true;
    this.isSuccess = true;
    this.authService.ResetMessage();
    this.authService.register(username, email, password);
    this.authService.getRegisterMessageAccept().subscribe((data) => {
      if (data != '') {
        this.isSuccess = false;
      }
    });
    this.authService.getRegisterMessageUsernameError().subscribe((data) => {
      if (data != '') {
        this.isDisable = false;
        this.isUsernameTaken = false;
      }
    });
    this.authService.getRegisterMessageEmailError().subscribe((data) => {
      if (data != '') {
        this.isDisable = false;
        this.isEmailTaken = false;
      }
    });
  }
}
