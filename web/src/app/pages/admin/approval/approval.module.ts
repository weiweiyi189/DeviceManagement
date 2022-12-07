import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {ApprovalRoutingModule} from './approval-routing.module';
import {ApprovalComponent} from './approval.component';
import {PartModule} from '../../../part/part.module';

@NgModule({
  declarations: [ApprovalComponent, AddComponent, EditComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ApprovalRoutingModule,
        FuncModule,
        FormsModule,
        PartModule
    ]
})
export class ApprovalModule {
}
