import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import {DetailRoutingModule} from './detail-routing.module';
import {DetailComponent} from './detail.component';
import {YzModalModule} from '@yunzhi/ng-common';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DetailRoutingModule,
    FuncModule,
    FormsModule,
    YzModalModule
  ]
})
export class DetailModule {
}
