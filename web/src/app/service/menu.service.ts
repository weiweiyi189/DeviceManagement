import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Menu} from '../func/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menusSubject = new BehaviorSubject<Array<Menu>>([
    // tslint:disable-next-line:max-line-length
    new Menu({name: '类型管理', icon: 'fab fa-audible', url: 'type', roles: [Menu.ROLE_MANAGER]}),
    new Menu({name: '部门管理', icon: 'fas fa-landmark', url: 'department', roles: [Menu.ROLE_ADMIN]}),
    new Menu({name: '转借审批', icon: 'fas fa-handshake', url: 'approval', roles: [Menu.ROLE_MANAGER]}),
    new Menu({name: '维修审批', icon: 'far fa-building', url: 'repair', roles: [Menu.ROLE_MANAGER]}),
    new Menu({name: '报废审批', icon: 'fas fa-chalkboard-teacher', url: 'scrap', roles: [Menu.ROLE_ADMIN,  Menu.ROLE_MANAGER]}),
    // tslint:disable-next-line:max-line-length
    new Menu({name: '设备管理', icon: 'fas fas fa-wrench', url: 'equipment', roles: [Menu.ROLE_ADMIN, Menu.ROLE_MANAGER, Menu.ROLE_COMMON, Menu.ROLE_REPAIR]}),
    new Menu({name: '人员管理', icon: 'fas fa-users', url: 'user', roles: [Menu.ROLE_ADMIN]}),
    new Menu({name: '人员管理', icon: 'far fa-address-card', url: 'manageUser', roles: [Menu.ROLE_MANAGER]}),
    new Menu({name: '审批查看', icon: 'far fa-address-card', url: 'view', roles: [Menu.ROLE_ADMIN]}),
    new Menu({name: '购入审批', icon: 'far fa-address-card', url: 'sale', roles: [Menu.ROLE_ADMIN]}),
    new Menu({name: '上报购入', icon: 'far fa-address-card', url: 'up', roles: [Menu.ROLE_MANAGER]}),
    new Menu({name: '设备维修', icon: 'fas fa-wrench', url: 'repairDepartment', roles: [Menu.ROLE_REPAIR]}),
    // tslint:disable-next-line:max-line-length
    new Menu({name: '我的借用', icon: 'fas fa-list-ul', url: 'myBorrow', roles: [Menu.ROLE_ADMIN, Menu.ROLE_MANAGER, Menu.ROLE_COMMON, Menu.ROLE_REPAIR]}),
    // tslint:disable-next-line:max-line-length
    new Menu({name: '个人中心', icon: 'fas fa-user',  url: 'personalCenter',  roles: [Menu.ROLE_ADMIN, Menu.ROLE_COMMON, Menu.ROLE_REPAIR, Menu.ROLE_MANAGER]})
  ]);

  constructor() {
  }

  getAll(): Observable<Array<Menu>> {
    return this.menusSubject.asObservable();
  }
}
