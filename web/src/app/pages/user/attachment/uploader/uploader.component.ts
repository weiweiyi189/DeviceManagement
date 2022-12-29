import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpParams, HttpResponse} from '@angular/common/http';
import {YzUploaderService} from '@yunzhi/ng-common';
import {Attachment} from '../../../../func/attachment';
import {MyFileService} from '../../../../service/my-file.service';
import {AttachmentService} from "../../../../service/attachment.service";

/**
 * 上传组件
 */
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => UploaderComponent)
    }
  ]
})
export class UploaderComponent implements OnInit, ControlValueAccessor {
  /**
   * 接收的图片类型
   */
  @Input()
  accept = '.jpeg,.jpg,.gif,.png';

  formControl = new FormControl(null);


  /**
   * 附件数组
   */
  attachments = new Array<Attachment>();

  /**
   * 附件id数组，用于初始化获取附件
   */
  attachmentIds = new Array<number>();


  /**
   * 上传文件的最大值
   */
  @Input()
  maxSize = 10 * 1024 * 1024;

  showUploader = false;

  constructor(private attachmentService: AttachmentService) {
  }

  ngOnInit(): void {
    return;
  }

  onClose(): void {
    this.showUploader = false;
  }

  /**
   * 下载附件
   */
  download(index: number) {
    this.attachmentService.download(
      this.attachments[index],
      this.attachments[index].name,
      new HttpParams());
  }

  /**
   * 删除已有附件
   * @param index
   */
  onDelete(index: number): void {
    // 获取该附件在id数组里的index
    const idIndex = this.attachmentIds.indexOf(this.attachments[index].id);

    if (idIndex > -1) {
      // 在数组里删除附件
      this.attachmentIds.splice(idIndex, 1);
      this.attachments.splice(index, 1);
      this.formControl.setValue(this.attachmentIds.join(','));
    }
  }

  /**
   * 获取附件
   */
  getAttachmentByIds(): void {
    console.log(this.attachmentIds);
    this.attachmentService.getAttachmentByIds(this.attachmentIds)
      .subscribe(attachments => {
        this.attachments = attachments;
      });
  }

  /**
   * 上传
   * */
  onUpload($event: { file: File; response: HttpResponse<Attachment> }): void {
    this.showUploader = false;
    this.attachments.push($event.response.body as Attachment);
    this.attachmentIds = this.attachments.map(attachment => attachment.id);
    // 加入逗号, 设置为"id1,id2,id3"格式的string
    this.formControl.setValue(this.attachmentIds.join(','));
  }

  registerOnChange(fn: (data: Attachment | null) => void): void {
    this.formControl.valueChanges.subscribe(data => {
      fn(data);
    });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: string): void {
    if (this.formControl.value !== null) {
      this.getIds(obj);
      this.getAttachmentByIds();
    }
    this.formControl.setValue(obj);
  }

  /**
   * 将字符串字符串转化为数字
   * @param value
   *
   */
  getIds(value: string): Array<number> {
    const array = new Array<number>();
    // 分割字符串，返回值为数组
    const fileIds = value.split(',');
    for (const fileId of fileIds) {
      // 过滤掉数组中的空格
      if (fileId !== null && fileId !== '' && fileId !== undefined) {
        // 转化为数字
        const id = Number(fileId);
          // 添加id
        this.attachmentIds.push(id);
        array.push(id);
      }
    }
    return array;
  }
}
