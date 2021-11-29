import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import {UpComponent} from './up.component';
import {UpRoutingModule} from './up-routing.module';

@NgModule({
  declarations: [UpComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FuncModule,
    UpRoutingModule,
  ]
})
export class UpModule {
}
