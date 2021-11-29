import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import {ScrapComponent} from './scrap.component';
import {ScrapRoutingModule} from './scrap-routing.module';
import {EquipmentModule} from '../equipment/equipment.module';
import {StatusPipe} from '../../../func/pipe/Status.pipe';

@NgModule({
  declarations: [ScrapComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrapRoutingModule,
    FuncModule,
    EquipmentModule
  ]
})
export class ScrapModule {
}
