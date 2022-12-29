import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploaderComponent} from './uploader.component';
import {YzUploaderModule} from '@yunzhi/ng-common';

/**
 * 上传模块
 */
@NgModule({
  declarations: [
    UploaderComponent
  ],
  imports: [
    CommonModule,
    YzUploaderModule
  ],
  exports: [UploaderComponent]
})
export class UploaderModule {
}
