import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploaderModule} from './uploader/uploader.module';
import {UploaderComponent} from './uploader/uploader.component';

/**
 * 附件模块
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UploaderModule
  ],
  exports: [
    UploaderComponent
  ]
})
export class AttachmentModule {
}
