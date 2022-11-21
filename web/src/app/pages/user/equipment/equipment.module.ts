import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {EquipmentRoutingModule} from './equipment-routing.module';
import {EquipmentComponent} from './equipment.component';
import { DetailComponent } from '../detail/detail.component';
import {StatusPipe} from '../../../func/pipe/Status.pipe';
import { BorrowComponent } from './borrow/borrow.component';

@NgModule({
  declarations: [EquipmentComponent, AddComponent, EditComponent, BorrowComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EquipmentRoutingModule,
    FuncModule,
    FormsModule
  ],
  exports: [
    EquipmentComponent
  ]
})
export class EquipmentModule {
}
