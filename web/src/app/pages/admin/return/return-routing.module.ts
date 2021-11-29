import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReturnComponent} from './return.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnComponent,
    data: {
      title: '首页'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnRoutingModule {
}
