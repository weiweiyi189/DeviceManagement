import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {EquipmentComponent} from './equipment.component';
import {DetailComponent} from '../detail/detail.component';
import {BorrowComponent} from "./borrow/borrow.component";

const routes: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    data: {
      title: '首页'
    }
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'borrow/:id',
    component: BorrowComponent,
    data: {
      title: '转借'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    data: {
      title: '借用'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule {
}
