import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import {ReturnRoutingModule} from './return-routing.module';
import {ReturnComponent} from './return.component';

@NgModule({
  declarations: [ReturnComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReturnRoutingModule,
    FuncModule,
    FormsModule
  ]
})
export class ReturnModule {
}
