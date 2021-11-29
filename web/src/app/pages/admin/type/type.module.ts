import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { TypeComponent } from './type.component';
import { TypeRoutingModule } from './type-routing.module';

@NgModule({
  declarations: [TypeComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    TypeRoutingModule,
    ReactiveFormsModule,
    FuncModule
  ]
})
export class TypeModule {
}
