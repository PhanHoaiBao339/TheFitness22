import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './../../service/auth.service';
import { UploadImageService } from './../../service/admin-page/upload-image.service';
import { BrandManagerService } from './../../service/admin-page/brand-manager.service';
import { StaticService } from './../../service/static.service';
import { ProductsManagerService } from './../../service/admin-page/products-manager.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private staticService: StaticService,
    private uploadImageService: UploadImageService,
    private brandManagerService: BrandManagerService,
    private productsManagerService: ProductsManagerService
  ) {}

  public htmlData: string = '';
  public readonlyEdit: boolean = true;

  ngOnInit(): void {
    this.validation();
    this.loadAll();
    this.loadAllBrand();
  }
  public urlDownloadImage: string =
    this.staticService.rootUrl + '/downloadFile/products/';
  public listAll: any[] = [];
  public listAllBrand: any;
  private selectedImage1: any;
  private selectedImage2: any;
  private selectedImage3: any;
  public btnNewDis: boolean = false;
  public btnSaveDis: boolean = false;
  public btnUpdateDis: boolean = true;
  public btnDeleteDis: boolean = true;
  public readonly: boolean = false;
  public loading: boolean = true;
  public changerImage: boolean = false;
  private originalProduct: any;
  public nameImage1: string = '';
  public nameImage2: string = '';
  public nameImage3: string = '';
  private indexEdit: number = -1;
  public productEdit: any = {
    id: '',
    name: '',
    price: 0,
    quantity: 0,
    available: false,
    image1: '',
    image2: '',
    image3: '',
    accessory: false,
    status: false,
    weight: '',
    numberofuses: '',
    proteincomposition: '',
    aminoacids: '',
    servings: '',
    othercomposition: '',
    contents: '',
    createday: null,
    personcreate: '',
    deleteday: null,
    persondelete: '',
    updateday: null,
    personupdate: null,
    brand: {
      id: 'choose',
      name: 'Choose',
    },
  };

  // public refreshTable() {
  //   this.loadAll();
  // }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
  });
  submitted = false;

  private validation() {
    this.form = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern('[a-z0-9]*'),
        ],
      ],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(type: string): void {
    this.submitted = true;
    switch (type) {
      case 'create':
        if (this.form.valid) {
          this.productEdit.id = this.form.value.id;
          this.productEdit.name = this.form.value.name;
          this.productEdit.price = this.form.value.price;
          this.productEdit.quantity = this.form.value.quantity;
          this.save();
        }
        break;
      case 'update':
        if (this.form.valid) {
          this.productEdit.name = this.form.value.name;
          this.productEdit.price = this.form.value.price;
          this.productEdit.quantity = this.form.value.quantity;
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

  public refreshEdit() {
    this.readonly = false;
    this.btnSaveDis = false;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
    this.nameImage1 = '';
    this.nameImage2 = '';
    this.nameImage3 = '';
    this.selectedImage1 = null;
    this.selectedImage2 = null;
    this.selectedImage3 = null;
    this.indexEdit = -1;
    this.productEdit = {
      id: '',
      name: '',
      price: 0,
      quantity: 0,
      available: false,
      image1: '',
      image2: '',
      image3: '',
      accessory: false,
      status: false,
      weight: '',
      numberofuses: '',
      proteincomposition: '',
      aminoacids: '',
      servings: '',
      othercomposition: '',
      contents: '',
      createday: null,
      personcreate: '',
      deleteday: null,
      persondelete: '',
      updateday: null,
      personupdate: null,
      brand: {
        id: 'choose',
        name: 'Choose',
      },
    };
    this.onReset();
  }

  private disBtn() {
    this.btnNewDis = true;
    this.btnSaveDis = true;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
  }

  public clickInput(index: number) {
    document.getElementById('FileUploadInput' + index)?.click();
  }

  public goToEdit(item: any, index: number) {
    this.readonly = true;
    this.btnSaveDis = true;
    this.btnUpdateDis = false;
    this.btnDeleteDis = false;
    this.productEdit = item;
    this.originalProduct = item;
    this.nameImage1 = item.image1;
    this.nameImage2 = item.image2;
    this.nameImage3 = item.image3;
    this.indexEdit = index;
    this.form.setValue({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
    document.getElementById('nav-edit-tab')?.click();
  }

  private loadAll() {
    this.loading = true;
    this.productsManagerService.getAll().subscribe((data) => {
      this.listAll = data;
      this.loading = false;
    });
  }

  private loadAllBrand() {
    this.brandManagerService.getAll().subscribe((data) => {
      this.listAllBrand = data;
    });
  }

  public changeImageFile(index: number, event: any) {
    switch (index) {
      case 1:
        this.selectedImage1 = <File>event.target.files[0];
        this.nameImage1 = event.target.files[0].name;
        this.previewImg(1, event);
        break;
      case 2:
        this.selectedImage2 = <File>event.target.files[0];
        this.nameImage2 = event.target.files[0].name;
        this.previewImg(2, event);
        break;
      case 3:
        this.selectedImage3 = <File>event.target.files[0];
        this.nameImage3 = event.target.files[0].name;
        this.previewImg(3, event);
        break;
    }
  }

  public previewImg(index: number, e: any) {
    const image = <HTMLInputElement>(
      document.getElementById('img-preview' + index)
    );
    if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      image.src = src;
    }
    if (this.productEdit.image1 != '') {
      this.changerImage = true;
    }
  }

  public onUpload() {
    let fileUploadInput1 = <HTMLInputElement>(
      document.querySelector('#FileUploadInput1')
    );
    let fileUploadInput2 = <HTMLInputElement>(
      document.querySelector('#FileUploadInput2')
    );
    let fileUploadInput3 = <HTMLInputElement>(
      document.querySelector('#FileUploadInput3')
    );

    var image1 = fileUploadInput1.files || [];
    var image2 = fileUploadInput2.files || [];
    var image3 = fileUploadInput3.files || [];
    if (image1.length != 0) {
      this.uploadImageService
        .uploadeImage('products', image1[0])
        .subscribe((data) => {});
    }
    if (image2.length != 0) {
      this.uploadImageService
        .uploadeImage('products', image2[0])
        .subscribe((data) => {});
    }
    if (image3.length != 0) {
      this.uploadImageService
        .uploadeImage('products', image3[0])
        .subscribe((data) => {});
    }
  }

  public save() {
    this.disBtn();
    this.onUpload();
    if (
      this.productEdit.id != '' &&
      this.productEdit.name != '' &&
      this.productEdit.price != '' &&
      this.productEdit.quantity != ''
    ) {
      this.productEdit.createday = new Date().toISOString();
      this.productEdit.image1 =
        this.selectedImage1?.name || this.productEdit.image1;
      this.productEdit.image2 =
        this.selectedImage2?.name || this.productEdit.image2;
      this.productEdit.image3 =
        this.selectedImage3?.name || this.productEdit.image3;
      this.authService
        .getLoggedUsername()
        .subscribe((data) => {
          this.productEdit.personcreate = data;
          this.productsManagerService
            .save(this.productEdit)
            .subscribe((data) => {
              this.listAll.push(data);
              this.refreshEdit();
              document.getElementById('nav-table-tab')?.click();
              alert('Create Product Successfully!');
            });
        })
        .unsubscribe();
    } else {
      alert('Please complete all information!');
    }
  }

  public update() {
    this.disBtn();
    this.onUpload();
    if (
      this.productEdit.id != '' &&
      this.productEdit.name != '' &&
      this.productEdit.price != '' &&
      this.productEdit.quantity != ''
    ) {
      this.productEdit.updateday = new Date().toISOString();
      this.productEdit.image1 =
        this.selectedImage1?.name || this.productEdit.image1;
      this.productEdit.image2 =
        this.selectedImage2?.name || this.productEdit.image2;
      this.productEdit.image3 =
        this.selectedImage3?.name || this.productEdit.image3;
      this.authService
        .getLoggedUsername()
        .subscribe((data) => {
          this.productEdit.personupdate = data;
          this.productsManagerService
            .update(this.productEdit)
            .subscribe((data) => {
              this.listAll[this.indexEdit] = data;
              this.refreshEdit();
              document.getElementById('nav-table-tab')?.click();
              alert('Update Product Successfully!');
            });
        })
        .unsubscribe();
    } else {
      alert('Please complete all information!');
    }
  }

  public deleteById(id: string, index: number) {
    this.disBtn();
    this.productsManagerService.delete(id).subscribe((data) => {
      if (this.indexEdit == -1) {
        this.listAll[index] = data;
      } else {
        this.listAll[this.indexEdit] = data;
      }
      this.refreshEdit();
      alert('Delete Successfully!');
    });
  }

  public resetImage() {
    const image1 = <HTMLInputElement>document.getElementById('img-preview1');
    const image2 = <HTMLInputElement>document.getElementById('img-preview2');
    const image3 = <HTMLInputElement>document.getElementById('img-preview3');
    image1.src = this.urlDownloadImage + this.originalProduct.image1;
    image2.src = this.urlDownloadImage + this.originalProduct.image2;
    image3.src = this.urlDownloadImage + this.originalProduct.image3;
    this.nameImage1 = this.originalProduct.image1;
    this.nameImage2 = this.originalProduct.image2;
    this.nameImage3 = this.originalProduct.image3;
    this.changerImage = false;
  }

  public viewMedia(view: any) {
    return this.sanitizer.bypassSecurityTrustHtml(view);
  }
}
