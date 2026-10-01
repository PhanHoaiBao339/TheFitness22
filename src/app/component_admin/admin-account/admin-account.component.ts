import { AuthService } from './../../service/auth.service';
import { UploadImageService } from './../../service/admin-page/upload-image.service';
import { StaticService } from './../../service/static.service';
import { AccountManagerService } from './../../service/admin-page/account-manager.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss'],
})
export class AdminAccountComponent implements OnInit {
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private staticService: StaticService,
    private uploadImageService: UploadImageService,
    private accountManagerService: AccountManagerService
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.validation();
  }

  public birthdayValue: any;
  public downloadUrl: string =
    this.staticService.rootUrl + '/downloadFile/account/';
  private editedUsername: string = '';
  public listAll: any[] = [];
  public changerImage: boolean = false;
  public photoImage: string = '';
  public btnNewDis: boolean = false;
  public btnSaveDis: boolean = false;
  public btnUpdateDis: boolean = true;
  public btnDeleteDis: boolean = true;
  public readonly: boolean = false;
  public loading: boolean = true;
  private indexEdit: number = -1;
  public isUsernameTaken: boolean = false;
  public isEmailTaken: boolean = false;
  public accountEdit: any = {
    username: '',
    email: '',
    password: '',
    fullname: '',
    gender: true,
    birthday: '',
    phone: '',
    address: '',
    photo: 'No_image_available.png',
    active: false,
    createday: '',
    deleteday: null,
    persondelete: null,
    updateday: null,
    personupdate: null,
  };
  public originalAccount: any = {
    username: '',
    email: '',
    password: '',
    fullname: '',
    gender: true,
    birthday: '',
    phone: '',
    address: '',
    photo: 'No_image_available.png',
    active: false,
    createday: '',
    deleteday: null,
    persondelete: null,
    updateday: null,
    personupdate: null,
  };

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  private validation() {
    this.form = this.formBuilder.group({
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
          Validators.maxLength(60),
        ],
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(type: string): void {
    this.submitted = true;
    switch (type) {
      case 'create':
        if (this.form.valid && !this.isUsernameTaken && !this.isEmailTaken) {
          this.accountEdit.username = this.form.value.username;
          this.accountEdit.email = this.form.value.email;
          this.accountEdit.password = this.form.value.password;
          this.save();
        }
        break;
      case 'update':
        if (this.form.valid) {
          this.accountEdit.email = this.form.value.email;
          this.accountEdit.password = this.form.value.password;
          this.update();
        }
        break;

      default:
        break;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public checkUserOrEmailTaken(type: string) {
    if (type == 'username') {
      let username = <HTMLInputElement>document.getElementById('username');
      if (
        this.listAll.find((item) => item.username == username.value) !=
        undefined
      ) {
        this.isUsernameTaken = true;
      } else {
        this.isUsernameTaken = false;
      }
    } else {
      let email = <HTMLInputElement>document.getElementById('email');
      if (this.listAll.find((item) => item.email == email.value) != undefined) {
        this.isEmailTaken = true;
      } else {
        this.isEmailTaken = false;
      }
    }
  }

  public clickInputImage() {
    document.getElementById('FileUploadInput')?.click();
  }

  // public refreshTable() {
  //   this.loadAll();
  // }
  public refreshEdit() {
    this.selectedFIle = '';
    this.readonly = false;
    this.btnNewDis = false;
    this.btnSaveDis = false;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
    this.indexEdit = -1;
    this.photoImage = '';
    this.accountEdit = {
      username: '',
      email: '',
      password: '',
      fullname: '',
      gender: true,
      birthday: '',
      phone: '',
      address: '',
      photo: null,
      active: false,
      createday: '',
      deleteday: null,
      persondelete: null,
      updateday: null,
      personupdate: null,
    };
    this.originalAccount = {
      username: '',
      email: '',
      password: '',
      fullname: '',
      gender: true,
      birthday: '',
      phone: '',
      address: '',
      photo: null,
      active: false,
      createday: '',
      deleteday: null,
      persondelete: null,
      updateday: null,
      personupdate: null,
    };
    this.onReset();
  }

  private loadAll() {
    this.loading = true;
    this.authService.getLoggedUsername().subscribe((data) => {
      if (data != '') {
        this.editedUsername = data;
      }
    });
    this.accountManagerService.getAll().subscribe((data) => {
      this.listAll = data;
      this.loading = false;
    });
  }

  public goToEdit(item: any, index: number) {
    this.readonly = true;
    this.btnNewDis = false;
    this.btnSaveDis = true;
    this.btnUpdateDis = false;
    this.btnDeleteDis = false;
    this.accountEdit = item;
    this.originalAccount = item;
    this.photoImage = this.originalAccount.photo;
    this.birthdayFilter(this.accountEdit.birthday);
    this.form.setValue({
      username: item.username,
      email: item.email,
      password: item.password,
    });

    this.indexEdit = index;
    document.getElementById('nav-edit-tab')?.click();
  }

  private disBtn() {
    this.btnNewDis = true;
    this.btnSaveDis = true;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
  }

  public changerPassword() {
    if (this.form.value.password === this.originalAccount.password) {
      this.form.patchValue({
        password: '',
      });
    }
  }

  public resetPass() {
    if (this.form.value.password === '') {
      this.form.patchValue({
        password: this.originalAccount.password,
      });
    }
  }

  public saveAccount(check: boolean) {
    if (
      this.accountEdit.username != '' &&
      this.accountEdit.password != '' &&
      this.accountEdit.email != ''
    ) {
      this.accountEdit.birthday = this.birthdayValue;
      this.accountEdit.createday = new Date().toISOString();
      if (check) {
        this.accountEdit.photo = this.selectedFIle || this.accountEdit.photo;
      }
      this.accountManagerService.save(this.accountEdit).subscribe((data) => {
        this.listAll.push(data);
        this.refreshEdit();
        document.getElementById('nav-table-tab')?.click();
        alert('Create Account Successfully!');
      });
    } else {
      alert('Please complete all information!');
    }
  }

  public save() {
    this.disBtn();
    if (!this.changerImage) {
      this.saveAccount(false);
    } else {
      if (
        confirm('You have changed the photo do you want to save the new photo?')
      ) {
        this.onUpload();
        this.saveAccount(true);
      } else {
        this.saveAccount(false);
      }
    }
  }
  public update() {
    this.disBtn();
    if (!this.changerImage) {
      this.updateAccount(false);
    } else {
      if (
        confirm('You have changed the photo do you want to save the new photo?')
      ) {
        this.onUpload();
        this.updateAccount(true);
      } else {
        this.updateAccount(false);
      }
    }
  }

  private updateAccount(check: boolean) {
    if (
      this.accountEdit.username != '' &&
      this.accountEdit.password != '' &&
      this.accountEdit.email != ''
    ) {
      this.accountEdit.birthday = this.birthdayValue;
      this.accountEdit.updateday = new Date().toISOString();
      this.accountEdit.personupdate = this.editedUsername;
      if (check) {
        this.accountEdit.photo = this.selectedFIle || this.accountEdit.photo;
      }
      this.accountManagerService.update(this.accountEdit).subscribe((data) => {
        this.listAll[this.indexEdit] = data;
        this.refreshEdit();
        document.getElementById('nav-table-tab')?.click();
        alert('Update Account Successfully!');
      });
    } else {
      alert('Please complete all information!');
    }
  }

  public deleteById(id: string, index: number) {
    this.disBtn();
    this.accountManagerService.delete(id).subscribe((data) => {
      if (this.indexEdit == -1) {
        this.listAll[index] = data;
      } else {
        this.listAll[this.indexEdit] = data;
      }
      this.refreshEdit();
      document.getElementById('nav-table-tab')?.click();
      alert('Delete Account Successfully!');
    });
  }

  private selectedFIle: any;

  public changeImageFile(event: any) {
    const image = <HTMLInputElement>document.getElementById('img-preview');

    if (event.target.files.length) {
      const src = URL.createObjectURL(event.target.files[0]);
      this.photoImage = event.target.files[0].name;

      image.src = src;
      this.changerImage = true;
    }
  }

  public onUpload() {
    let fileUploadInput = <HTMLInputElement>(
      document.querySelector('#FileUploadInput')
    );
    var files = fileUploadInput.files || [];
    this.uploadImageService
      .uploadeImage('account', files[0])
      .subscribe((data) => {
        this.selectedFIle = data.fileName;
        alert('Upload Photo Successfully!');
      });
  }

  public resetImage() {
    const image = <HTMLInputElement>document.getElementById('img-preview');
    image.src = this.downloadUrl + this.originalAccount.photo;
    this.photoImage = this.originalAccount.photo;
    this.changerImage = false;
  }

  public birthdayFilter(date: string) {
    let create: Date = new Date(date);
    this.birthdayValue = this.datePipe.transform(create, 'yyyy-MM-dd');
    console.log(this.birthdayValue);
  }
}
