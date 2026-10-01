import { AuthService } from './../../service/auth.service';
import { ProductsManagerService } from './../../service/admin-page/products-manager.service';
import { FlavororcolorManagerService } from './../../service/admin-page/flavororcolor-manager.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-admin-flavor-or-color',
  templateUrl: './admin-flavor-or-color.component.html',
  styleUrls: ['./admin-flavor-or-color.component.scss'],
})
export class AdminFlavorOrColorComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private flavororcolorManagerService: FlavororcolorManagerService,
    private productsManagerService: ProductsManagerService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.loadAllProducts();
    this.loadAllDetail();
    this.loadAll();
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
  public flavorColorEdit: any = {
    id: null,
    product: {},
    flavorOrColorDetail: {},
  };
  public flavorColorDetailEdit: any = {
    id: '',
    name: '',
    active: false,
    createday: null,
    deleteday: null,
    updateday: null,
    personcreate: '',
    persondelete: '',
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
          this.flavorColorDetailEdit.id = this.form.value.id;
          this.flavorColorDetailEdit.name = this.form.value.name;
          this.saveDetail();
        }
        break;
      case 'update':
        if (this.form.valid) {
          this.flavorColorDetailEdit.name = this.form.value.name;
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

  // public refreshTable() {
  //   this.loadAll();
  //   this.loadAllDetail();
  // }

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

  public refreshEdit() {
    this.btnNewDis = false;
    this.btnSaveDis = false;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
    this.chooseProduct = 'choose';
    this.chooseDetail = 'choose';
    this.indexEdit = -1;
  }
  public refreshDetailEdit() {
    this.readonly = false;
    this.btnNewDetailDis = false;
    this.btnSaveDetailDis = false;
    this.btnUpdateDetailDis = true;
    this.btnDeleteDetailDis = true;
    this.indexEditDetail = -1;
    this.flavorColorDetailEdit = {
      id: '',
      name: '',
      active: false,
      createday: null,
      deleteday: null,
      updateday: null,
      personcreate: '',
      persondelete: '',
      personupdate: '',
    };
    this.onReset();
  }

  public goToEdit(item: any, index: number) {
    this.btnSaveDis = true;
    this.btnUpdateDis = false;
    this.btnDeleteDis = false;
    this.flavorColorEdit = item;
    this.chooseProduct = this.flavorColorEdit.product.id;
    this.chooseDetail = this.flavorColorEdit.flavorOrColorDetail.id;
    this.indexEdit = index;
    document.getElementById('nav-edit-flavorcolor-tab')?.click();
  }

  public goToEditDetail(item: any, index: number) {
    this.readonly = true;
    this.btnSaveDetailDis = true;
    this.btnUpdateDetailDis = false;
    this.btnDeleteDetailDis = false;
    this.flavorColorDetailEdit = item;
    this.indexEditDetail = index;
    this.form.setValue({
      id: item.id,
      name: item.name,
    });
    document.getElementById('nav-edit-flavorcolordetail-tab')?.click();
  }

  private loadAllDetail() {
    this.loading1 = true;
    this.flavororcolorManagerService.getAllDetail().subscribe((data) => {
      this.listAllDetail = data;
      this.loading1 = false;
    });
  }

  private loadAll() {
    this.loading2 = true;
    this.flavororcolorManagerService.getAll().subscribe((data) => {
      this.listAll = data;
      this.loading2 = false;
    });
  }

  private loadAllProducts() {
    this.productsManagerService.getAll().subscribe((data) => {
      this.listAllProducts = data;
    });
  }

  public saveDetail() {
    this.disDetailBtn();
    if (
      this.flavorColorDetailEdit.id != '' &&
      this.flavorColorDetailEdit.name != ''
    ) {
      this.flavorColorDetailEdit.createday = new Date().toISOString();
      this.authService
        .getLoggedUsername()
        .subscribe((data) => {
          this.flavorColorDetailEdit.personcreate = data;
          this.flavororcolorManagerService
            .saveDetail(this.flavorColorDetailEdit)
            .subscribe((data) => {
              this.listAllDetail.push(data);
              this.refreshDetailEdit();
              document
                .getElementById('nav-table-flavorcolordetail-tab')
                ?.click();
              alert('Create Flavor Or Color Detail Successfully!');
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
      this.flavorColorDetailEdit.id != '' &&
      this.flavorColorDetailEdit.name != ''
    ) {
      this.flavorColorDetailEdit.updateday = new Date().toISOString();
      this.authService
        .getLoggedUsername()
        .subscribe((data) => {
          this.flavorColorDetailEdit.personupdate = data;
          this.flavororcolorManagerService
            .updateDetail(this.flavorColorDetailEdit)
            .subscribe((data) => {
              this.listAllDetail[this.indexEditDetail] = data;
              this.refreshDetailEdit();
              document
                .getElementById('nav-table-flavorcolordetail-tab')
                ?.click();
              alert('Update Flavor Or Color Detail Successfully!');
            });
        })
        .unsubscribe();
    } else {
      alert('Please complete all information!');
    }
  }

  public deleteDetailById(id: string, index: number) {
    this.disDetailBtn();
    let getusername = this.authService.getLoggedUsername().subscribe((data) => {
      this.flavororcolorManagerService
        .deleteDetail(id, data)
        .subscribe((data) => {
          if (this.indexEditDetail == -1) {
            this.listAllDetail[index] = data;
          } else {
            this.listAllDetail[this.indexEditDetail] = data;
          }

          this.refreshDetailEdit();
          alert('Delete Flavor Or Color Detail Successfully!');
        });
    });
    getusername.unsubscribe();
  }

  public save() {
    this.disBtn();
    if (this.chooseDetail != 'choose' && this.chooseProduct != 'choose') {
      this.productsManagerService
        .getOne(this.chooseProduct)
        .subscribe((data) => {
          this.flavorColorEdit.product = data;
          this.flavororcolorManagerService
            .getOne(this.chooseDetail)
            .subscribe((data) => {
              this.flavorColorEdit.flavorOrColorDetail = data;
              this.flavororcolorManagerService
                .save(this.flavorColorEdit)
                .subscribe((data) => {
                  this.listAll.push(data);
                  this.refreshEdit();
                  document.getElementById('nav-table-flavorcolor-tab')?.click();
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
          this.flavorColorEdit.product = data;
          this.flavororcolorManagerService
            .getOne(this.chooseDetail)
            .subscribe((data) => {
              this.flavorColorEdit.flavorOrColorDetail = data;
              this.flavororcolorManagerService
                .update(this.flavorColorEdit)
                .subscribe((data) => {
                  this.listAll[this.indexEdit] = data;
                  this.refreshEdit();
                  document.getElementById('nav-table-flavorcolor-tab')?.click();
                  alert('Update Flavor Or Color Successfully!');
                });
            });
        });
    } else {
      alert('Please complete all information!');
    }
  }

  public deleteById(id: string, index: number) {
    this.disBtn();
    this.flavororcolorManagerService.delete(id).subscribe((data) => {
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
