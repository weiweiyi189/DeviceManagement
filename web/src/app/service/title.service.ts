import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  /** 路由标题观察者对象 */
  private title$ = new BehaviorSubject<string>('');

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    // 订阅路由事件
    this.router.events
    // 过滤：路由结束事件
      .pipe(filter((event) => event instanceof NavigationEnd))
      // 订阅路由结束后执行的方法
      .subscribe(() => {
        // 初始化
        let route: ActivatedRoute = this.activatedRoute;
        let title = '';
        // 遍历路由并拼接
        while (route) {
          if (route.snapshot.data.title) {
            title += route.snapshot.data.title + ' - ';
          }
          route = route.firstChild;
        }
        // 观察者对象发送数据
        this.title$.next(title.substr(0, title.length - 3));
      });
  }

  title(): Observable<string> {
    return this.title$;
  }
}
