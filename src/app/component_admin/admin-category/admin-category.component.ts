import { AuthService } from './../../service/auth.service';
import { ProductsManagerService } from './../../service/admin-page/products-manager.service';
import { CategoryManagerService } from './../../service/admin-page/category-manager.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private categoryManagerService: CategoryManagerService,
    private productsManagerService: ProductsManagerService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.loadAllDetail();
    this.loadAll();
    this.loadAllProducts();
  }

  public listAll: any[] = [];
  public listAllDetail: any[] = [];
  public listAllProducts: any[] = [];
  public chooseProduct: any = 'choose';
  public chooseDetail: any = 'choose';
  public btnNewDis: boolean = false;
  public btnSaveDis: boolean = false;
  public btnUpdateDis: boolean = true;
  public btnDeleteDis: boolean = true;
  public btnNewDetailDis: boolean = false;
  public btnSaveDetailDis: boolean = false;
  public btnUpdateDetailDis: boolean = true;
  public btnDeleteDetailDis: boolean = true;
  public readonly: boolean = false;
  public loading1: boolean = true;
  public loading2: boolean = true;
  private indexEdit: number = -1;
  private indexEditDetail: number = -1;
  public categoryEdit: any = {
    id: null,
    product: {},
    categoryDetail: {},
  };
  public categoryDetailEdit: any = {
    id: '',
    name: '',
    active: false,
    createday: null,
    personcreate: '',
    deleteday: null,
    persondelete: '',
    updateday: null,
    personupdate: '',
  };

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
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
      name: ['', [Validators.required, Validators.maxLength(50)]],
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
          this.categoryDetailEdit.id = this.form.value.id;
          this.categoryDetailEdit.name = this.form.value.name;
          this.saveDetail();
        }
        break;
      case 'update':
        if (this.form.valid) {
          this.categoryDetailEdit.name = this.form.value.name;
          this.updateDetail();
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

  private disBtn() {
    this.btnNewDis = true;
    this.btnSaveDis = true;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
  }

  private disDetailBtn() {
    this.btnNewDetailDis = true;
    this.btnSaveDetailDis = true;
    this.btnUpdateDetailDis = true;
    this.btnDeleteDetailDis = true;
  }

  public goToEdit(item: any, index: number) {
    this.btnSaveDis = true;
    this.btnUpdateDis = false;
    this.btnDeleteDis = false;
    this.categoryEdit = item;
    this.chooseProduct = this.categoryEdit.product.id;
    this.chooseDetail = this.categoryEdit.categoryDetail.id;
    this.indexEdit = index;
    document.getElementById('nav-edit-category-tab')?.click();
  }

  public goToEditDetail(item: any, index: number) {
    this.readonly = true;
    this.btnSaveDetailDis = true;
    this.btnUpdateDetailDis = false;
    this.btnDeleteDetailDis = false;
    this.categoryDetailEdit = item;
    this.indexEditDetail = index;
    this.form.setValue({
      id: item.id,
      name: item.name,
    });
    document.getElementById('nav-edit-categorydetail-tab')?.click();
  }

  private loadAllDetail() {
    this.loading1 = true;
    this.categoryManagerService.getAllDetail().subscribe((data) => {
      this.listAllDetail = data;
      this.loading1 = false;
    });
  }
  private loadAll() {
    this.loading2 = true;
    this.categoryManagerService.getAll().subscribe((data) => {
      this.listAll = data;
      this.loading2 = false;
    });
  }

  private loadAllProducts() {
    this.productsManagerService.getAll().subscribe((data) => {
      this.listAllProducts = data;
    });
  }

  // public refreshTable() {
  //   this.loadAll();
  //   this.loadAllDetail();
  // }

  public refreshEdit() {
    this.btnNewDis = false;
    this.btnSaveDis = false;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
    this.chooseProduct = 'choose';
    this.chooseDetail = 'choose';
    this.indexEdit = -1;
  }

  public refreshEditDetail() {
    this.readonly = false;
    this.btnNewDetailDis = false;
    this.btnSaveDetailDis = false;
    this.btnUpdateDetailDis = true;
    this.btnDeleteDetailDis = true;
    this.indexEditDetail = -1;
    this.categoryDetailEdit = {
      id: '',
      name: '',
      active: false,
      createday: null,
      personcreate: '',
      deleteday: null,
      persondelete: '',
      updateday: null,
      personupdate: '',
    };
    this.onReset();
  }

  public saveDetail() {
    this.disDetailBtn();
    if (
      this.categoryDetailEdit.id != '' &&
      this.categoryDetailEdit.name != ''
    ) {
      this.categoryDetailEdit.createday = new Date().toISOString();
      this.authService
        .getLoggedUsername()
        .subscribe((data) => {
          this.categoryDetailEdit.personcreate = data;
          this.categoryManagerService
            .saveDetail(this.categoryDetailEdit)
            .subscribe((data) => {
              this.listAllDetail.push(data);
              this.refreshEditDetail();
              document.getElementById('nav-table-categorydetail-tab')?.click();
              alert('Create Category Detail Successfully!');
            });
        })
        .unsubscribe();
    } else {
      alert('Please complete all information!');
    }
  }

  public updateDetail() {
    this.disDetailBtn();
    if (
      this.categoryDetailEdit.id != '' &&
      this.categoryDetailEdit.name != ''
    ) {
      this.categoryDetailEdit.updateday = new Date().toISOString();
      this.authService
        .getLoggedUsername()
        .subscribe((data) => {
          this.categoryDetailEdit.personupdate = data;
          this.categoryManagerService
            .updateDetail(this.categoryDetailEdit)
            .subscribe((data) => {
              this.listAllDetail[this.indexEditDetail] = data;
              this.refreshEditDetail();
              document.getElementById('nav-table-categorydetail-tab')?.click();
              alert('Update Category Detail Successfully!');
            });
        })
        .unsubscribe();
    } else {
      alert('Please complete all information!');
    }
  }

  public deleteDetailById(id: string, index: number) {
    this.disDetailBtn();
    this.categoryManagerService.deleteDetail(id).subscribe((data) => {
      this.listAllDetail[this.indexEditDetail] = data;
      if (this.indexEdit == -1) {
        this.listAllDetail[index] = data;
      } else {
        this.listAllDetail[this.indexEditDetail] = data;
      }
      this.refreshEditDetail();
      alert('Update Category Detail Successfully!');
    });
  }

  public save() {
    this.disBtn();
    if (this.chooseDetail != 'choose' && this.chooseProduct != 'choose') {
      this.productsManagerService
        .getOne(this.chooseProduct)
        .subscribe((data) => {
          this.categoryEdit.product = data;
          this.categoryManagerService
            .getOne(this.chooseDetail)
            .subscribe((data) => {
              this.categoryEdit.categoryDetail = data;
              this.categoryManagerService
                .save(this.categoryEdit)
                .subscribe((data) => {
                  this.listAll.push(data);
                  this.refreshEdit();
                  document.getElementById('nav-table-category-tab')?.click();
                  alert('Create Category Successfully!');
                });
            });
        });
    } else {
      alert('Please complete all information!');
    }
  }

  public update() {
    this.disBtn();
    if (this.chooseDetail != 'choose' && this.chooseProduct != 'choose') {
      this.productsManagerService
        .getOne(this.chooseProduct)
        .subscribe((data) => {
          this.categoryEdit.product = data;
          this.categoryManagerService
            .getOne(this.chooseDetail)
            .subscribe((data) => {
              this.categoryEdit.categoryDetail = data;
              this.categoryManagerService
                .update(this.categoryEdit)
                .subscribe((data) => {
                  this.listAll[this.indexEdit] = data;
                  this.refreshEdit();
                  document.getElementById('nav-table-category-tab')?.click();
                  alert('Update Category Successfully!');
                });
            });
        });
    } else {
      alert('Please complete all information!');
    }
  }

  public deleteById(id: string, index: number) {
    this.disBtn();
    this.categoryManagerService.delete(id).subscribe((data) => {
      if (this.indexEdit == -1) {
        this.listAll.splice(index, 1);
      } else {
        this.listAll.splice(this.indexEdit, 1);
      }
      this.refreshEdit();
      alert(data.message);
    });
  }
}
