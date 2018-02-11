import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@core/api//api.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: [ './uploader.component.less' ]
})
export class UploaderComponent {
  _url: string;
  uploading = false;
  file: any = null;
  showCropperModal = false;

  @Input() title = '图片';

  @Input() name: string = new Date().getTime().toString();

  @Input()
  set url (val: string) {
    this._url = val;
  }

  get url (): string {
    return this._url;
  }

  @Input() cropper = false;

  @Output() onUpload = new EventEmitter<string>();

  constructor (
    private api: ApiService,
    private msg: NzMessageService
  ) {}

  beforeUpload = (file): boolean => {
    this.file = file;
    return !this.cropper;
  }

  change () {
    if (!this.cropper) {
      this.upload();
    }
  }

  upload () {
    if (!this.file) {
      return this.msg.warning('请选择图片');
    }
    this.uploading = true;
    const filename = this.file.name.split('.').join(`_${new Date().getTime()}.`);
    this.api.multipartUpload('img/' + this.name + filename, this.file).then(res => {
      this.uploading = false;
      this.onUpload.emit(res.url);
    });
  }

  cancel () {}

  delete (event) {
    event.preventDefault();
    event.stopPropagation();
    this.file = null;
    this.onUpload.emit('');
  }
}
