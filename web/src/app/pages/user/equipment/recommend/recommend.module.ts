import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendComponent } from './recommend.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FuncModule} from "../../../../func/func.module";
import {PartModule} from "../../../../part/part.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FuncModule,
    PartModule,
    RouterModule,
  ],
  exports: [

  ]
})
export class RecommendModule { }
