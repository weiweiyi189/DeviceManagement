import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {DepartmentComponent} from './department.component';
import {DepartmentRoutingModule} from './department-routing.module';
import {PartModule} from "../../../part/part.module";

@NgModule({
  declarations: [DepartmentComponent , AddComponent, EditComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DepartmentRoutingModule,
        FuncModule,
        FormsModule,
        PartModule
    ]
})
export class DepartmentModule {
}
