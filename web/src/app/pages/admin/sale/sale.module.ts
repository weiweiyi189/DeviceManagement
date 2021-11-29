import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import {SaleRoutingModule} from './sale-routing.module';
import {SaleComponent} from './sale.component';

@NgModule({
  declarations: [SaleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SaleRoutingModule,
    FuncModule,
    FormsModule
  ]
})
export class SaleModule {
}
