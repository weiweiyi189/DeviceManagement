import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import {RepairComponent} from './repair.component';
import {RepairRoutingModule} from './repair-routing.module';
import {EquipmentModule} from '../equipment/equipment.module';
import {StatusPipe} from '../../../func/pipe/Status.pipe';

@NgModule({
  declarations: [RepairComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RepairRoutingModule,
    FuncModule,
    EquipmentModule
  ]
})
export class RepairModule {
}
