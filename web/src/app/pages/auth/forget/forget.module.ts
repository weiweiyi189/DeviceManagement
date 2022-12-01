import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetRoutingModule } from './forget-routing.module';
import { ForgetComponent } from './forget.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginModule} from '../login/login.module';


@NgModule({
  declarations: [ForgetComponent],
  imports: [
    CommonModule,
    ForgetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ForgetModule { }
