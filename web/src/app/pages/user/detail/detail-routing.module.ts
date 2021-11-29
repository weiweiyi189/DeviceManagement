import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailComponent} from './detail.component';
// @ts-ignore


const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
    data: {
      title: '首页'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule {
}
