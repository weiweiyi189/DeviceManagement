import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {User} from '../func/User';
import {AppOnReadyItem, CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseDir = 'auth';

  private currentLoginUser: User;

  /**
   * buffer 设置为 1
   * 只保留最新的登录用户
   */
  private currentLoginUser$ = new ReplaySubject<User>(1);

  /**
   * 用户注销时触发的回调函数
   * 一般用于清除缓存
   */
  private loginTriggerCallbacks = new Array<() => void>();

  /**
   * APP是否准备好元素
   * 将此加入到commonService中。能够来共同决定APP是否准备完毕
   * 仅当commonService中所有的AppOnReadyItem全部准备完结后
   * 才 this.commonService.appOnReady(() => { 执行这里的代码 })
   * 比如：在系统使用前，我们需要先需要获取当前的登录用户，则在些新建一个AppOnReadyItem
   * 并在构造函数中添加到commonService中。
   */
  private appOnReadyItem: AppOnReadyItem;

  constructor(private httpClient: HttpClient,
              protected router: Router,
              private commonService: CommonService) {
    this.appOnReadyItem = this.commonService.getAppOnReadyItem();
    // 如果当前不是登录模块，请求当前登录用户
    if (!this.router.url.startsWith(`/login`)) {
      this.requestCurrentLoginUser();
    } else {
      this.appOnReadyItem.ready = true;
    }
  }


  login(user: User): Observable<User> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // 添加认证信息
    headers = headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<User>(`${this.baseDir}/login`, {headers}).pipe(tap((data) => {
    }));
  }

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser$(): Observable<User> {
    return this.currentLoginUser$;
  }

  /**
   * 设置当前登录用户
   * @param user 登录用户
   */
  setCurrentLoginUser(user: User): void {
    this.currentLoginUser = user;
    this.currentLoginUser$.next(user);
  }

  /**
   * 请求当前登录用户
   */
  requestCurrentLoginUser(callback?: () => void): void {
    this.appOnReadyItem.ready = false;
    // 由于在构造函数中使用了本函数, 不加setTimeout在其他地方注入时可能会造成undefined的问题
    // 为什么httpClient请求不以异步进行 需要setTimeout还没研究明白
    setTimeout(() => {
      this.httpClient.get<User>(`${this.baseDir}/user`)
        .subscribe((user: User) => {
          this.triggerLoginCallbacks();
          this.setCurrentLoginUser(user);
        }, () => {
          this.appOnReadyItem.ready = true;
        }, () => {
          this.appOnReadyItem.ready = true;
          if (callback) {
            callback();
          }
        });
    });
  }

  /**
   * 调用登录成功后的回调函数
   */
  public triggerLoginCallbacks(): void {
    this.loginTriggerCallbacks.forEach(callback => {
      if (callback) {
        callback();
      }
    });
  }
}
