import { AuthService } from './../../service/auth.service';
import { StaticService } from './../../service/static.service';
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as customBuild from '../ckeditor5-35.4.0-lny6snoj43ge/build/ckeditor';

@Component({
  selector: 'app-my-ck-editor',
  templateUrl: './my-ck-editor.component.html',
  styleUrls: ['./my-ck-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyCkEditorComponent),
      multi: true,
    },
  ],
})
export class MyCkEditorComponent implements OnInit, ControlValueAccessor {
  public Editor: any = customBuild;
  @Input() readonly: boolean = false;

  private _value: string = '';

  get value() {
    return this._value;
  }

  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  @Input()
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
  private _name = '';

  constructor(
    private staticService: StaticService,
    private authService: AuthService
  ) {}

  private token: string = '';

  onChange(_: string) {}
  onTouch() {}

  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  private url: string = '';
  ngOnInit(): void {
    this.authService.getLoggedToken().subscribe((data) => (this.token = data));
    this.url = this.staticService.rootUrl + '/uploadFile/' + this._name;
    this.config.simpleUpload.uploadUrl = this.url;
  }

  title = 'ckeditorAngular10';
  @Input() config = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'fontSize',
        'heading',
        '|',
        'bold',
        'underline',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        'alignment',
        '|',
        'insertTable',
        'blockQuote',
        'removeFormat',
        'findAndReplace',
        '-',
        'link',
        // 'imageUpload',
        'mediaEmbed',
        'imageInsert',
        'textPartLanguage',
      ],
      shouldNotGroupWhenFull: true,
    },
    image: {
      // Configure the available styles.
      styles: ['alignLeft', 'alignCenter', 'alignRight'],

      // Configure the available image resize options.
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null,
        },
        {
          name: 'resizeImage:50',
          label: '25%',
          value: '25',
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50',
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75',
        },
      ],
      // You need to configure the image toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [
        'imageStyle:alignLeft',
        'imageStyle:alignCenter',
        'imageStyle:alignRight',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative',
      ],
    },
    simpleUpload: {
      //  The URL that the images are uploaded to.
      uploadUrl: '',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },

      // Enable the XMLHttpRequest.withCredentials property.
    },

    language: 'en',
  };

  onReady(editor: any) {
    if (editor.model.schema.isRegistered('image')) {
      editor.model.schema.extend('image', { allowAttributes: 'blockIndent' });
    }
  }
}
