import { ProductsManagerService } from './../../service/admin-page/products-manager.service';
import { SizeManagerService } from './../../service/admin-page/size-manager.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-admin-size',
  templateUrl: './admin-size.component.html',
  styleUrls: ['./admin-size.component.scss'],
})
export class AdminSizeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sizeManagerService: SizeManagerService,
    private productsManagerService: ProductsManagerService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.loadAll();
    this.loadAllProducts();
  }

  public listAll: any[] = [];
  public listAllProducts: any[] = [];
  public chooseProduct: any = 'choose';
  public btnNewDis: boolean = false;
  public btnSaveDis: boolean = false;
  public btnUpdateDis: boolean = true;
  public btnDeleteDis: boolean = true;
  public readonly: boolean = false;
  public loading: boolean = true;
  private indexEdit: number = -1;
  public sizeEdit: any = {
    id: null,
    product: {},
    name: '',
  };

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  submitted = false;

  private validation() {
    this.form = this.formBuilder.group({
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
          this.sizeEdit.name = this.form.value.name;
          this.save();
        }
        break;
      case 'update':
        if (this.form.valid) {
          this.sizeEdit.name = this.form.value.name;
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

  // public refreshTable() {
  //   this.loadAll();
  // }

  public refreshEdit() {
    this.readonly = false;
    this.btnNewDis = false;
    this.btnSaveDis = false;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
    this.indexEdit = -1;
    this.sizeEdit = {
      id: null,
      product: {},
      name: '',
    };
    this.chooseProduct = 'choose';
    this.onReset();
  }

  private disBtn() {
    this.btnNewDis = true;
    this.btnSaveDis = true;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
  }

  public goToEdit(item: any, index: number) {
    this.readonly = true;
    this.btnNewDis = false;
    this.btnSaveDis = true;
    this.btnUpdateDis = false;
    this.btnDeleteDis = false;
    this.sizeEdit = item;
    this.chooseProduct = this.sizeEdit.product.id;
    this.indexEdit = index;
    this.form.setValue({
      name: item.name,
    });
    document.getElementById('nav-edit-tab')?.click();
  }

  private loadAll() {
    this.loading = true;
    this.sizeManagerService.getAll().subscribe((data) => {
      this.listAll = data;
    });
  }

  private loadAllProducts() {
    this.productsManagerService.getAll().subscribe((data) => {
      this.listAllProducts = data;
      this.loading = false;
    });
  }

  public save() {
    this.disBtn();
    if (this.chooseProduct != 'choose' && this.sizeEdit.name != '') {
      this.productsManagerService
        .getOne(this.chooseProduct)
        .subscribe((data) => {
          this.sizeEdit.product = data;
          this.sizeManagerService.save(this.sizeEdit).subscribe((data) => {
            this.listAll.push(data);
            this.refreshEdit();
            document.getElementById('nav-table-tab')?.click();
            alert('Create Size Successfully!');
          });
        });
    } else {
      alert('Please complete all information!');
    }
  }

  public update() {
    this.disBtn();
    if (this.chooseProduct != 'choose' && this.sizeEdit.name != '') {
      this.productsManagerService
        .getOne(this.chooseProduct)
        .subscribe((data) => {
          this.sizeEdit.product = data;
          this.sizeManagerService.update(this.sizeEdit).subscribe((data) => {
            this.listAll[this.indexEdit] = data;
            this.refreshEdit();
            document.getElementById('nav-table-tab')?.click();
            alert('Update Size Successfully!');
          });
        });
    } else {
      alert('Please complete all information!');
    }
  }

  public deleteById(id: string, index: number) {
    this.disBtn();
    this.sizeManagerService.delete(id).subscribe((data) => {
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
