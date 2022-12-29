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
import {PartModule} from '../../../part/part.module';
import {RecommendModule} from "./recommend/recommend.module";
import {RecommendComponent} from "./recommend/recommend.component";
import {UploaderModule} from "../attachment/uploader/uploader.module";

@NgModule({
  declarations: [EquipmentComponent, AddComponent, EditComponent, BorrowComponent, RecommendComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EquipmentRoutingModule,
        FuncModule,
        FormsModule,
        PartModule,
        UploaderModule,
    ],
  exports: [
    EquipmentComponent
  ]
})
export class EquipmentModule {
}
