import { BlogManagerService } from './../../service/admin-page/blog-manager.service';
import { UploadImageService } from './../../service/admin-page/upload-image.service';
import { StaticService } from './../../service/static.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
})
export class AdminBlogComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private staticService: StaticService,
    private uploadImageService: UploadImageService,
    private blogManagerService: BlogManagerService
  ) {}

  public rootUrl: string = this.staticService.rootUrl + '/downloadFile/blogs/';
  public htmlData: string = '';
  public readonlyEdit: boolean = true;
  public loading: boolean = true;
  public readonly: boolean = false;
  public listAll: any[] = [];
  private selectedImage: any;
  public btnNewDis: boolean = false;
  public btnSaveDis: boolean = false;
  public btnUpdateDis: boolean = true;
  public btnDeleteDis: boolean = true;
  public configEdit: any = {};
  private indexEdit: number = -1;
  public validTopic: boolean = false;
  public blogEdit: any = {
    id: '',
    title: '',
    topic: 'choose',
    image: '',
    contents: '',
    active: false,
  };

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    contents: new FormControl(''),
  });
  submitted = false;

  private validation() {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
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
        if (this.form.valid && this.checkChooseTopic()) {
          this.blogEdit.title = this.form.value.title;
          this.save();
        }
        break;
      case 'update':
        if (this.form.valid && this.checkChooseTopic()) {
          this.blogEdit.title = this.form.value.title;
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

  private checkChooseTopic(): boolean {
    if (this.blogEdit.topic == 'choose') {
      this.validTopic = true;
      return false;
    } else {
      this.validTopic = false;
      return true;
    }
  }

  ngOnInit(): void {
    this.validation();
    this.loadAll();
  }

  public viewMedia(view: any) {
    return this.sanitizer.bypassSecurityTrustHtml(view);
  }

  private loadAll() {
    this.loading = true;
    this.blogManagerService.getAll().subscribe((data) => {
      this.listAll = data;
      this.loading = false;
      this.newId();
    });
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
    this.blogEdit = item;
    this.indexEdit = index;
    this.form.setValue({
      title: item.title,
    });
    document.getElementById('nav-edit-tab')?.click();
  }

  public clickInput() {
    document.getElementById('FileUploadInput')?.click();
  }

  public changeImageFile(event: any) {
    this.selectedImage = <File>event.target.files[0];
    this.previewImg(event);
    console.log(this.selectedImage);
  }

  public previewImg(e: any) {
    const image = <HTMLInputElement>document.getElementById('img-preview');
    if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      image.src = src;
    }
  }

  public onUpload() {
    let fileUploadInput = <HTMLInputElement>(
      document.querySelector('#FileUploadInput')
    );

    var image = fileUploadInput.files || [];
    if (image.length != 0) {
      this.uploadImageService
        .uploadeImage('blogs', image[0])
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  // public refreshTable() {
  //   this.loadAll();
  // }

  // New - Save - Update - Delete
  public refreshEdit() {
    this.readonly = false;
    this.btnNewDis = false;
    this.btnSaveDis = false;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
    this.blogEdit = {
      id: '',
      title: '',
      topic: '',
      image: '',
      contents: '',
      active: false,
    };
    this.selectedImage = null;
    this.indexEdit = -1;
    this.onReset();
  }

  public newId() {
    this.readonly = false;
    this.btnSaveDis = false;
    this.btnUpdateDis = true;
    this.btnDeleteDis = true;
    this.blogEdit = {
      id: this.autoId(),
      title: '',
      topic: 'choose',
      image: '',
      contents: '',
      active: false,
    };
    this.selectedImage = null;
  }

  public autoId() {
    let writeID: string = '';

    writeID = this.createID(this.listAll.length);

    for (let index = 0; index < this.listAll.length; index++) {
      const e = this.listAll[index];
      if (writeID == e.id) {
        writeID = this.createID(index + 2);
        console.log(index);
        break;
      }
    }
    return writeID;
  }

  public createID(add: number) {
    let write: string = '';

    if (add < 10) {
      write = 'blog00' + add;
      return write;
    } else if (add < 100) {
      write = 'blog0' + add;
      return write;
    } else {
      write = 'blog' + add;
      return write;
    }
  }

  public save() {
    this.disBtn();

    if (this.selectedImage?.name.length > 50) {
      alert('The image name is too long!');
    } else {
      this.onUpload();
      this.blogEdit.image = this.selectedImage?.name || this.blogEdit.image;
      if (
        this.blogEdit.id != '' &&
        this.blogEdit.title != '' &&
        this.blogEdit.topic != 'choose' &&
        this.blogEdit.image != '' &&
        this.blogEdit.contents != ''
      ) {
        this.blogManagerService.save(this.blogEdit).subscribe((data) => {
          this.listAll.push(data);
          this.refreshEdit();
          document.getElementById('nav-table-tab')?.click();
          alert('Create Blog Successfully!');
        });
      } else {
        alert('Please complete all information!');
        this.btnSaveDis = false;
      }
    }
  }

  public update() {
    this.disBtn();
    if (this.selectedImage?.name.length > 50) {
      alert('The image name is too long!');
    } else {
      this.onUpload();
      if (
        this.blogEdit.id != '' &&
        this.blogEdit.title != '' &&
        this.blogEdit.topic != '' &&
        this.blogEdit.image != '' &&
        this.blogEdit.contents != ''
      ) {
        this.blogEdit.image = this.selectedImage?.name || this.blogEdit.image;
        this.blogManagerService.update(this.blogEdit).subscribe((data) => {
          this.listAll[this.indexEdit] = data;
          this.refreshEdit();
          document.getElementById('nav-table-tab')?.click();
          alert('Update Product Successfully!');
        });
      } else {
        alert('Please complete all information!');
        this.btnUpdateDis = false;
        this.btnDeleteDis = false;
      }
    }
  }

  public deleteById(id: string, index: number) {
    this.disBtn();
    this.blogManagerService.delete(id).subscribe((data) => {
      if (this.indexEdit == -1) {
        this.listAll[index] = data;
      } else {
        this.listAll[this.indexEdit] = data;
      }
      this.refreshEdit();
      alert('Delete Product Successfully!');
    });
  }
}
