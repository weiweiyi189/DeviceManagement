import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user.component';
import {PartModule} from "../../../part/part.module";

@NgModule({
  declarations: [UserComponent, AddComponent, EditComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FuncModule,
        FormsModule,
        PartModule
    ],
  exports: [
    AddComponent
  ]
})
export class UserModule {
}
