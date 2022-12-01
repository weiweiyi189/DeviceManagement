import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetComponent } from './forget.component';
import {LoginComponent} from '../login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetRoutingModule { }
