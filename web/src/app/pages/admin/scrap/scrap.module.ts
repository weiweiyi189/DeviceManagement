import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import {ScrapRoutingModule} from './scrap-routing.module';
import {ScrapComponent} from './scrap.component';

@NgModule({
  declarations: [ScrapComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrapRoutingModule,
    FuncModule,
    FormsModule
  ]
})
export class ScrapModule {
}
