import { DatePipe } from '@angular/common';
import { LikeService } from './../../service/user-page/like.service';
import { AccountManagerService } from './../../service/admin-page/account-manager.service';
import { UploadImageService } from './../../service/admin-page/upload-image.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LayoutComponent } from './../layout/layout.component';
import { OrderAndOrderdetailService } from './../../service/user-page/order-and-orderdetail.service';
import { AuthService } from './../../service/auth.service';
import { StaticService } from './../../service/static.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public imageAccountUrl: string =
    this.staticService.rootUrl + '/downloadFile/account/';
  public imageProductUrl: string =
    this.staticService.rootUrl + '/downloadFile/products/';

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private likeService: LikeService,
    private authService: AuthService,
    private cookieService: CookieService,
    private staticService: StaticService,
    private layoutComponent: LayoutComponent,
    private uploadImageService: UploadImageService,
    private accountManagerService: AccountManagerService,
    private orderAndOrderdetailService: OrderAndOrderdetailService
  ) {}
  public birthdayValue: any;
  public username: string = '';
  public edit: boolean = false;
  public photoImage: string = '';
  public listAllOrder: any[] = [];
  public changerImage: boolean = false;
  public listAllOrderDetail: any[] = [];
  public listAllLike: any[] = [];
  public listAllOrderDetailRoot: any[] = [];
  public updateBtnDisabled: boolean = false;
  public updateImageDisabled: boolean = false;
  private originalPassword: string = '';
  // private originalAccount: any = {};
  public account: any = {
    username: '',
    email: '',
    password: '',
    fullname: '',
    gender: true,
    birthday: '',
    phone: '',
    address: '',
    photo: '',
    active: true,
    createday: '',
    deleteday: null,
    persondelete: '',
    updateday: null,
    personupdate: '',
  };

  ngOnInit(): void {
    this.loadInit();
  }

  private loadInit() {
    if (this.cookieService.check('LoginTOKEN')) {
      this.layoutComponent.loading(true);
      setTimeout(() => {
        this.loadAccount();
        this.loadListOrder();
      }, 2000);
    } else {
      this.authService
        .isLoggedSuccess()
        .subscribe((data) => {
          if (data) {
            this.layoutComponent.loading(true);
            this.loadAccount();
            this.loadListOrder();
          } else {
            this.router.navigate(['/login']);
          }
        })
        .unsubscribe();
    }
  }

  public OnOffEdit() {
    if (this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  public refreshAccount() {
    this.account = JSON.parse(localStorage.getItem('originalAccount') || '');
    if (this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  public update() {
    this.updateBtnDisabled = true;
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
      this.account.username != '' &&
      this.account.password != '' &&
      this.account.email != ''
    ) {
      this.account.birthday = this.birthdayValue;
      this.account.updateday = new Date().toISOString();
      this.account.personupdate = this.username;
      if (check) {
        this.account.photo = this.selectedFIle || this.account.photo;
      }
      this.accountManagerService.update(this.account).subscribe((data) => {
        this.refreshAccount();
        this.OnOffEdit();
        this.updateBtnDisabled = false;
        localStorage.setItem('originalAccount', JSON.stringify(data));
        this.authService.getLoggedToken().subscribe((data) => {
          this.authService.autoLoginByToken(data);
        });
        alert('Update Account Successfully!');
      });
    } else {
      alert('Please complete all information!');
    }
  }

  private loadAccount() {
    this.authService.getLoggedUsername().subscribe((data) => {
      this.username = data;
      this.loadListLike(data);
    });
    if (this.username !== '') {
      this.authService.getAccountByUsername(this.username).subscribe((data) => {
        this.account = data;
        this.originalPassword = data.password;
        this.photoImage = data.photo;
        this.birthdayFilter(this.account.birthday);
        localStorage.setItem('originalAccount', JSON.stringify(data));
      });
    }
  }

  private loadListOrder() {
    if (this.username != '') {
      this.orderAndOrderdetailService
        .loadAllOrderByUsername(this.username)
        .subscribe((data) => {
          this.listAllOrder = data;
          this.loadListOrderDetail();
        });
    }
  }

  private loadListOrderDetail() {
    this.listAllOrder.forEach((element) => {
      this.orderAndOrderdetailService
        .loadAllOrderDetailByOrderId(element.id)
        .subscribe((data) => {
          data.forEach((element: any) => {
            this.listAllOrderDetail.push(element);
            this.listAllOrderDetailRoot.push(element);
          });
        });
    });
    this.layoutComponent.loading(false);
  }

  private loadListLike(username: string) {
    this.likeService.getAllByAccount(username).subscribe((data) => {
      this.listAllLike = data;
    });
  }

  public changerPassword() {
    if (this.account.password === this.originalPassword) {
      this.account.password = '';
    }
  }

  public resetPass() {
    let inputPW = <HTMLInputElement>document.getElementById('password');
    if (inputPW.value == '') {
      this.account.password = this.originalPassword;
    }
  }

  public resetImage() {
    const image = <HTMLInputElement>document.getElementById('img-preview');
    image.src = this.imageAccountUrl + this.account.photo;
    this.photoImage = this.account.photo;
    this.changerImage = false;
  }

  public totalPrice(idorder: number) {
    let total = 0;
    let list = Object.assign(this.listAllOrderDetail, idorder).filter(
      (item: { orderProduct: { id: number } }) =>
        item.orderProduct.id == idorder
    );
    list.forEach((element) => {
      total += element.price;
    });
    return total;
  }

  public showDetail(idorder: number) {
    this.listAllOrderDetail = Object.assign(
      this.listAllOrderDetailRoot,
      idorder
    ).filter(
      (item: { orderProduct: { id: number } }) =>
        item.orderProduct.id == idorder
    );
    document.getElementById('nav-table-orderdetail-tab')?.click();
  }
  public allDetail() {
    this.listAllOrderDetail = this.listAllOrderDetailRoot;
  }

  public clickInputImage() {
    document.getElementById('FileUploadInput')?.click();
  }

  private selectedFIle: any;

  public changeImageFile(event: any) {
    const image = <HTMLInputElement>document.getElementById('img-preview');

    if (event.target.files.length) {
      const src = URL.createObjectURL(event.target.files[0]);
      image.src = src;
      this.photoImage = event.target.files[0].name;
      this.changerImage = true;
    }
  }

  public onUpload() {
    this.updateImageDisabled = true;
    let fileUploadInput = <HTMLInputElement>(
      document.querySelector('#FileUploadInput')
    );
    var files = fileUploadInput.files || [];
    this.uploadImageService
      .uploadeImage('account', files[0])
      .subscribe((data) => {
        this.selectedFIle = data.fileName;
        this.updateImageDisabled = false;
        alert('Upload Photo Successfully!');
      });
  }

  public birthdayFilter(date: string) {
    let create: Date = new Date(date);
    this.birthdayValue = this.datePipe.transform(create, 'yyyy-MM-dd');
    console.log(this.birthdayValue);
  }
}
