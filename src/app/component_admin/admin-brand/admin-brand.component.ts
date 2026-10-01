import { AuthService } from './../../service/auth.service';
import { BrandManagerService } from './../../service/admin-page/brand-manager.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.scss'],
})
export class AdminBrandComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private brandManagerService: BrandManagerService
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.validation();
  }

  public btnNewDis: boolean = false;
  public btnSaveDis: boolean = false;
  public btnUpdateDis: boolean = true;
  public btnDeleteDis: boolean = true;
  public readonly: boolean = false;
  public loading: boolean = true;
  public listAll: any;
  private indexEdit: number = -1;
  public branEdit: any = {
    id: '',
    name: '',
    madein: '',
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
          this.branEdit.id = this.form.value.id;
          this.branEdit.name = this.form.value.name;
          this.save();
        }
        break;
      case 'update':
        if (this.form.valid) {
          this.branEdit.name = this.form.value.name;
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
    this.btnSaveDis = false;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
    this.indexEdit = -1;
    this.branEdit = {
      id: '',
      name: '',
      madein: '',
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

  private disBtn() {
    this.btnNewDis = true;
    this.btnSaveDis = true;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
  }

  public goToEdit(item: any, index: number) {
    this.readonly = true;
    this.btnSaveDis = true;
    this.btnUpdateDis = false;
    this.btnDeleteDis = false;
    this.branEdit = item;
    this.indexEdit = index;
    this.form.setValue({
      id: item.id,
      name: item.name,
    });
    document.getElementById('nav-edit-tab')?.click();
  }

  private loadAll() {
    this.loading = true;
    this.brandManagerService.getAll().subscribe((data) => {
      this.listAll = data;
      this.loading = false;
    });
  }

  public save() {
    this.disBtn();
    if (this.branEdit.id != '' && this.branEdit.name != '') {
      this.branEdit.createday = new Date().toISOString();
      this.authService
        .getLoggedUsername()
        .subscribe((data) => {
          this.branEdit.personcreate = data;
          this.brandManagerService.save(this.branEdit).subscribe((data) => {
            this.listAll.push(data);
            this.refreshEdit();
            document.getElementById('nav-table-tab')?.click();
            alert('Create Brand Successfully!');
          });
        })
        .unsubscribe();
    } else {
      alert('Please complete all information!');
    }
  }

  public update() {
    this.disBtn();
    if (this.branEdit.id != '' && this.branEdit.name != '') {
      this.branEdit.updateday = new Date().toISOString();
      this.authService
        .getLoggedUsername()
        .subscribe((data) => {
          this.branEdit.personupdate = data;
          this.brandManagerService.update(this.branEdit).subscribe((data) => {
            this.listAll[this.indexEdit] = data;
            this.refreshEdit();
            document.getElementById('nav-table-tab')?.click();
            alert('Update Brand Successfully!');
          });
        })
        .unsubscribe();
    } else {
      alert('Please complete all information!');
    }
  }

  public deleteById(id: string, index: number) {
    this.brandManagerService.delete(id).subscribe((data) => {
      if (this.indexEdit == -1) {
        this.listAll[index] = data;
      } else {
        this.listAll[this.indexEdit] = data;
      }
      this.refreshEdit();
      alert('Delete Brand Successfully!');
    });
  }
}
