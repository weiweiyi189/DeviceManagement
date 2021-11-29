import { Component, OnDestroy, OnInit } from '@angular/core';
import {Menu} from '../../func/Menu';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {isDefined} from '../../core/secondUtils';
import {User} from '../../func/User';
import {AuthService} from '../../service/auth.service';
import {Subscription} from 'rxjs';
import {MenuService} from '../../service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class MenuComponent implements OnInit, OnDestroy {
  menus: Array<Menu>;
  currentLoginUser: User;

  environment = environment;

  // primaryMenus: Array<Menu>;

  private subscription: Subscription;
  private userSubscription: Subscription;
  constructor(
    private router: Router,
    private menuService: MenuService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.menuService.getAll()
      .subscribe(data => {
        this.authService.getCurrentLoginUser$()
          .subscribe((user: User) => {
            this.currentLoginUser = user;
            console.log(user);
            this.menus = [];
            if (isDefined(this.currentLoginUser)) {
              data.forEach((menu) => {
                if (menu.roles.includes(user.role)) {
                  this.menus.push(menu);
                }
              });
            }
          });
      });
  }


    ngOnDestroy(): void {
  }

    getBackgroundColor(menu: Menu): string {
    if (this.active(menu)) {
      return environment.color;
    }
  }

    getTextColor(menu: Menu): string {
    if (this.active(menu)) {
      return 'white';
    }
  }

  /**
   * 判断当前菜单是否激活
   * @param menu 菜单
   */
    active(menu: Menu): boolean {
    // 截取/的位置
    const start = this.router.url.indexOf('/');
    const end = this.router.url.indexOf('/', start + 1);

    // 定义主路由
    let mainRoute: string;

    // 根据是否有第2个/选择截取方式
    if (end !== -1) {
      mainRoute = this.router.url.substring(start + 1, end);
    } else {
      mainRoute = this.router.url.substring(start + 1, this.router.url.length);
    }

    // 判断当前路由是否激活
    return mainRoute === menu.url;
  }
    navigate(menu: Menu): void {
    this.router.navigateByUrl(menu.url);
  }
}
