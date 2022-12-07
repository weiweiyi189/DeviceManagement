import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './part/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          title: '首页'
        }
      },
      {
        path: 'type',
        loadChildren: () => import('./pages/admin/type/type.module').then(m => m.TypeModule),
        data: {
          title: '类型管理'
        }
      },
      {
        path: 'department',
        loadChildren: () => import('./pages/admin/department/department.module').then(m => m.DepartmentModule),
        data: {
          title: '部门管理'
        }
      },
      {
        path: 'approval',
        loadChildren: () => import('./pages/admin/approval/approval.module').then(m => m.ApprovalModule),
        data: {
          title: '转借审批'
        }
      },
      {
        path: 'repair',
        loadChildren: () => import('./pages/admin/return/return.module').then(m => m.ReturnModule),
        data: {
          title: '维修审批'
        }
      },
      {
        path: 'scrap',
        loadChildren: () => import('./pages/admin/scrap/scrap.module').then(m => m.ScrapModule),
        data: {
          title: '报废审批'
        }
      },
      {
        path: 'myBorrow',
        loadChildren: () => import('./pages/user/detail/detail.module').then(m => m.DetailModule),
        data: {
          title: '我的借用'
        }
      },
      {
        path: 'equipment',
        loadChildren: () => import('./pages/user/equipment/equipment.module').then(m => m.EquipmentModule),
        data: {
          title: '设备管理'
        }
      },
      {
        path: 'sale',
        loadChildren: () => import('./pages/admin/sale/sale.module').then(m => m.SaleModule),
        data: {
          title: '购入审批'
        }
      },
      {
        path: 'manageUser',
        loadChildren: () => import('./pages/user/user/user.module').then(m => m.UserModule),
        data: {
          title: '人员管理'
        }
      },
      {
        path: 'view',
        loadChildren: () => import('./pages/admin/view/view.module').then(m => m.ViewModule),
        data: {
          title: '审批查看'
        }
      },
      {
        path: 'up',
        loadChildren: () => import('./pages/admin/up/up.module').then(m => m.UpModule),
        data: {
          title: '上报购入'
        }
      },
      {
        path: 'repairDepartment',
        loadChildren: () => import('./pages/user/repair/repair.module').then(m => m.RepairModule),
        data: {
          title: '设备维修'
        }
      },
      {
        path: 'type',
        loadChildren: () => import('./pages/admin/type/type.module').then(m => m.TypeModule),
        data: {
          title: '类型管理'
        }
      },
      {
        path: 'personalCenter',
        loadChildren: () => import('./pages/personal-center/personal-center.module').then(m => m.PersonalCenterModule),
        data: {
          title: '个人中心'
        }
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/admin/user/user.module').then(m => m.UserModule),
        data: {
          title: '用户管理'
        }
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
