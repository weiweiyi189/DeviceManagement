import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SaleComponent} from './sale.component';

const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
    data: {
      title: '首页'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule {
}
