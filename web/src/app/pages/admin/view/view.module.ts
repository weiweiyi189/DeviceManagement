import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {ViewRoutingModule} from './view-routing.module';
import {ViewComponent} from './view.component';

@NgModule({
  declarations: [ViewComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ViewRoutingModule,
    FuncModule,
    FormsModule
  ]
})
export class ViewModule {
}
