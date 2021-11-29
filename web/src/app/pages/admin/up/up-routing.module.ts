import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpComponent} from './up.component';

const routes: Routes = [
  {
    path: '',
    component: UpComponent,
    data: {
      title: '首页'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpRoutingModule {
}
