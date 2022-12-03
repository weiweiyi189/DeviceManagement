import {Injectable} from '@angular/core';
import swal, {SweetAlertIcon, SweetAlertResult} from 'sweetalert2';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import * as Assert from 'assert';
import {HttpErrorResponse} from '@angular/common/http';
import {convertToLoadingFormat, UnknownProperty} from '../core/secondUtils';
import {Random} from '../core/utils';


/**
 * 应用程序准备完毕的影响元素
 * 用于程序程序时，设置：应用程序准备完毕状态
 * 比如系统启用动需要首先获取当前登录用户及系统菜单
 * 当所有的加载完成后，我们认为系统已准备完毕，此时可以进行相应的其它请求
 *
 */
export class AppOnReadyItem {

  /*本元素（比如：系统菜单）是否准备完毕*/
  private _READY = false;

  /* 当发送是否准备完毕状态时执行的回调方法 */
  private readonly sendReadyFn: (state: boolean) => void = (() => {
  });

  constructor(fn: (readyState: boolean) => void) {
    this.sendReadyFn = fn;
  }

  get ready(): boolean {
    return this._READY;
  }

  set ready(value: boolean) {
    this._READY = value;
    this.sendReadyFn(value);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private static digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  /**
   * 应用是否准备完毕
   */
  private appIsReadySubject = new BehaviorSubject<boolean>(true);
  public appIsReady$: Observable<boolean>;

  /**
   * 影响应用准备完毕的项
   * 遵循：对扩展开放，对修改关闭的原则。其它模块如果有影响系统启动的项时，将其添加到本属性中即可
   */
  private appOnReadyItems = Array<AppOnReadyItem>();

  /**
   * 缓存的当应用准备完毕后回调的函数
   * 该函数仅当应用准备完毕后调用1次
   */
  private appOnReadyCacheCallbacks: Array<() => void> = [];

  /** 当前是否处于后退状态 */
  private isBack = false;

  /** 当前路由是否能后退观察者 */
  private canBack$ = new BehaviorSubject<boolean>(false);

  /** 所有路由信息 */
  private routeStates: Array<{ url: string, state: UnknownProperty }> = [];

  /** 当前路由 */
  private currentUrl: string;

  /** 字符集 */
  private characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  /** 全局唯一 id 列表 */
  private uniqueIds: Set<string> = new Set<string>();

  private loadingSubject = new Subject<boolean>();
  public loading$: Observable<boolean>;

  /**
   * 使用ID进行比较
   * @param item1 第一个比较的对象
   * @param item2 第二个比较的对象
   */
  public static comparedWithId(item1: { id: number }, item2: { id: number }): boolean {
    if (item2 === item1) {
      return true;
    }

    if (item1 === null && item2 === undefined) {
      return true;
    }

    if (isNotNullOrUndefined(item1) && isNotNullOrUndefined(item2)) {
      return item1.id === item2.id;
    }

    return false;
  }

  /**
   * 转换为中文字符
   * 11 -> 十一
   * 支持两位及以下
   * @param num 输入数字
   */
  public static convertToChineseCharacter(num: number): string {
    /** 截取字符串 */
    const arr = String(num).split('');
    const length = arr.length;
    /** 校验支持长度 */
    if (length <= 0 || length >= 3) {
      return '';
    }
    /** 一位，直接转换成数字 */
    if (length === 1) {
      return this.digits[num];
    }
    /** 两位，拼接单位 十 */
    let result = '';
    if (arr[0] !== '1') {
      result += this.digits[arr[0]];
    }
    result += '十';
    if (arr[1] !== '0') {
      result += this.digits[arr[1]];
    }
    return result;
  }

  constructor(private router: Router) {
    this.loading$ = this.loadingSubject.asObservable();

    this.appIsReady$ = this.appIsReadySubject.asObservable();
    this.appIsReady$.subscribe(isReady => {
      if (isReady) {
        this.invokeOnReadyCacheCallback();
      }
    });

    /** 订阅路由事件 */
    this.router.events
    /** 过滤：路由结束事件 */
      .pipe(filter((event) => {
        return event instanceof NavigationEnd;
      }))
      /** 订阅路由结束后执行的方法 */
      .subscribe((routeState: NavigationEnd) => {
        this.currentUrl = routeState.urlAfterRedirects;

        if (this.isBack) {
          /** 如果处于后退状态，清空状态 */
          /** 获取完历史参数以后再清除后退状态 */
          this.isBack = false;
        } else if (!this.currentUrl.startsWith('/auth')) {
          /** 如果不是认证模块，将当前路由添加到数组中 */
          if (this.routeStates.length >= 50) {
            this.routeStates.splice(0, 1);
          }
          this.routeStates.push({url: this.currentUrl, state: this.router.getCurrentNavigation().extras.state});
        }

        /** 更新是否能后退信息 */
        this.canBack$.next(this.routeStates.length >= 2);
      });

  }

  /**
   * 应用程序准备就绪
   * @param callback 回调方法
   */
  appOnReady(callback: () => void): void {
    if (this.appIsReadySubject.getValue()) {
      callback();
    } else {
      this.appOnReadyCacheCallbacks.push(callback);
    }
  }

  /** 路由后退 */
  back(param = {clearHistoryQueryParams: false}): void {
    /** 清空当前的路由信息 */
    this.clearCurrentRoute();
    if (this.routeStates.length > 0) {
      /** 设置后退状态 */
      this.isBack = true;
      /** 路由跳转 */
      const routeState = this.routeStates[this.routeStates.length - 1];
      if (param.clearHistoryQueryParams) {
        routeState.state = {};
      }
      this.router.navigateByUrl(routeState.url, {state: routeState.state});
    }
  }

  canBack(): Observable<boolean> {
    return this.canBack$;
  }

  /**
   * 判断是否为指定浏览器并且版本不低于要求最低版本
   * @param type 浏览器类型
   * @param version 浏览器版本
   * b
   * @author zhaokaiqiang
   */
  checkBrowserTypeAndVersion(type: 'chrome' | 'firefox', version: string): boolean {
    if (this.getBrowserTypeAndVersion().type === type && this.compareVersion(this.getBrowserTypeAndVersion().version, version) >= 0) {
      return true;
    }
    return false;
  }

  /**
   * 清空当前路由信息
   */
  clearCurrentRoute(): void {
    this.routeStates.pop();
  }

  /**
   * @ sample
   * compareVersion('10.2.3.0,', '9.0.0.0') = 1;
   * compareVersion('10.2.3.0,', '10.2.3.0') = 0;
   * compareVersion('9.0.0.0,', '10.2.3.0') = -1;
   * @param version1 版本号1
   * @param version2 版本号2
   */
  public compareVersion(version1: string, version2: string): number {
    const versionArray1 = version1.split('\.'); // 注意此处为正则匹配，不能用"."；
    const versionArray2 = version2.split('\.');
    const minLength = Math.min(versionArray1.length, versionArray2.length); // 取最小长度值
    let diff = 0;
    for (let idx = 0; idx < minLength; idx++) {
      if (versionArray1[idx].length - versionArray2[idx].length !== 0) { // 先比较长度
        diff = versionArray1[idx].length - versionArray2[idx].length;
        break;
      } else if (versionArray1[idx].localeCompare(versionArray2[idx]) !== 0) { // 再比较字符
        diff = versionArray1[idx].localeCompare(versionArray2[idx]);
        break;
      }
    }

    // 如果已经分出大小，则直接返回，如果未分出大小，则再比较位数，有子版本的为大；
    diff = (diff !== 0) ? diff : versionArray1.length - versionArray2.length;
    return diff;
  }

  /**
   * 计算是否所有的系统启动项均已准备完毕
   * 遍历元素，所有的元素全部准备完毕，发送true
   * @param readyState 准备状态
   */
  private computeAppIsReady(readyState): void {
    if (!readyState) {
      this.appIsReadySubject.next(false);
    } else {
      let result = true;
      this.appOnReadyItems.forEach(readyItem => {
        if (!readyItem.ready) {
          result = false;
        }
      });
      this.appIsReadySubject.next(result);
    }
  }

  /**
   * 是否确认提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  confirm(callback?: (state?: boolean) => void, description: string = '该操作不可逆，请谨慎操作', title: string = '请确认',
          confirmButtonText = '确定', cancelButtonText = '取消', options = {icon: 'question' as SweetAlertIcon}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: options.icon,
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText,
      confirmButtonColor: '#007BFF',
      showCancelButton: true,
      cancelButtonText,
      cancelButtonColor: '#6C757D'
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback(result.value);
        }
      } else {
        callback(false);
      }
    });
  }

  /**
   * 操作失败提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  error(callback?: () => void, description: string = '', title: string = '操作失败'): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'error',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: '确定',
      confirmButtonColor: '#007BFF',
      showCancelButton: false
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }

  /**
   * 添加影响APP是否准备好的项
   * 1. 每新添加一项，则重新计算一次系统是否准备好，并对应的发送通知
   * 2. 每新项增加回调函数（以使得其在变更_ready时，能够解发重新计算APP是否准备好的方法并发送通知）
   * 3. 将新添加的项添加到影响系统是否启动完毕的数组中
   * @param isReady 是否准备完毕的初始化
   * @return appOnReadyItem 应用准备完毕项
   */
  public getAppOnReadyItem(isReady = false): AppOnReadyItem {
    // 实初化
    const appOnReadyItem = new AppOnReadyItem((readyState) => {
      this.computeAppIsReady(readyState);
    });
    appOnReadyItem.ready = isReady;
    this.appOnReadyItems.push(appOnReadyItem);

    // 当前项为：未就绪，则重新计算
    if (!isReady) {
      this.computeAppIsReady(isReady);
    }
    return appOnReadyItem;
  }

  /**
   * 获取当前路由的状态值
   */
  getCurrentRouteState(): UnknownProperty {
    if (this.routeStates.length === 0) {
      return {};
    }

    const state = this.routeStates[this.routeStates.length - 1].state;
    if (!isNotNullOrUndefined(state)) {
      return {};
    }
    return state;
  }

  /**
   * 获取浏览器类型和版本
   * @author zhaokaiqiang
   */
  public getBrowserTypeAndVersion(): { type: 'msie' | 'opera' | 'safari' | 'chrome' | 'firefox' | 'edge' | 'other', version?: string } {
    let type = 'other' as 'msie' | 'opera' | 'safari' | 'chrome' | 'firefox' | 'edge' | 'other';
    let version = null;
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.match(/msie ([\d.]+)/)) {
      type = 'msie';
      version = userAgent.match(/msie ([\d.]+)/)[1];
    } else if (userAgent.match(/edge\/([\d.]+)/)) {
      type = 'edge';
      version = userAgent.match(/edge\/([\d.]+)/)[1];
    } else if (userAgent.match(/edg\/([\d.]+)/)) {
      type = 'edge';
      version = userAgent.match(/edg\/([\d.]+)/)[1];
    } else if (userAgent.match(/firefox\/([\d.]+)/)) {
      type = 'firefox';
      version = userAgent.match(/firefox\/([\d.]+)/)[1];
    } else if (userAgent.match(/opr.([\d.]+)/)) {
      type = 'opera';
      version = userAgent.match(/opr.([\d.]+)/)[1];
    } else if (userAgent.match(/chrome\/([\d.]+)/)) {
      type = 'chrome';
      version = userAgent.match(/chrome\/([\d.]+)/)[1];
    } else if (userAgent.match(/version\/([\d.]+).*safari/)) {
      type = 'safari';
      version = userAgent.match(/version\/([\d.]+).*safari/)[1];
    } else if (userAgent.match(/rv:([\d.]+)/)) {
      type = 'msie';
      version = userAgent.match(/rv:([\d.]+)/)[1];
    }

    return {type, version};
  }

  /**
   * 生成随机 id
   * 暂定 8 位，该 API 可能会在以后的版本中更改，建议不少于 6 位，
   */
  getUniqueId(): string {
    /** 生成随机字符串 */
    let result = '';
    const length = this.characters.length;
    for (let i = 0; i < 8; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * length));
    }

    if (this.uniqueIds.has(result)) {
      /** 如果重复，重新生成 */
      return this.getUniqueId();
    } else {
      /** 添加到集合中 */
      this.uniqueIds.add(result);
      return result;
    }
  }

  httpError(httpError: HttpErrorResponse, callback?: () => void): void {
    return this.error(callback, httpError.error.message, '请求错误');
  }

  /**
   * 友情提示消息框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   * @param options showConfirmButton: 是否显示确认按钮
   */
  info(callback?: () => void, description: string = '', title: string = '友情提示', options = {showConfirmButton: true}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'info',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: '确定',
      confirmButtonColor: '#007BFF',
      showCancelButton: false,
      showConfirmButton: options.showConfirmButton
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }

  /**
   * 调用缓存的回调方法，并在调用后清空缓存以防止被二次调用
   */
  invokeOnReadyCacheCallback(): void {
    this.appOnReadyCacheCallbacks.forEach(callback => {
      callback();
    });
    this.appOnReadyCacheCallbacks.splice(0, this.appOnReadyCacheCallbacks.length);
  }

  /**
   * 判断当前 字符串 是否是邮箱
   * @param mobile 邮箱字符串
   */
  isMobile(mobile: string): boolean {
    const regex = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-9]{1}))+\d{8})$/;
    return regex.test(mobile);
  }

  /**
   * 正在加载中弹窗
   * 标题每1秒钟自动更新一次，加入 . 后缀
   * @param title 标题
   * @param description 描述信息
   * @param currentProcess 当前进度
   * @param maxStack 最大堆栈数（防止意外关闭窗口后的内存溢出）
   * @return close 关闭弹窗 currentProcessSubject 用于发送当前进度的数据源
   */
  loading(title = '请稍后', description = '', currentProcess = '', maxStack = 1000):
    { close: () => void, currentProcessSubject: Subject<string> } {
    const html = `${description}<br><b>${currentProcess}</b>`;
    const tips = [];
    const currentProcessSubject = new Subject<string>();
    currentProcessSubject.asObservable().subscribe((tip) => {
      tips.push(tip);
    });

    const loadingTipsTimerInterval = setInterval(() => {
      const tip = tips.shift();
      if (tip) {
        Swal.getContent().querySelector('b').textContent = tip;
      }
    }, 1500);

    let stack = 0;
    let timerInterval;
    swal.fire({
      title,
      html,
      timerProgressBar: true,
      onBeforeOpen: () => {
        swal.showLoading();
        timerInterval = setInterval(() => {
          Swal.getTitle().textContent = convertToLoadingFormat(Swal.getTitle().textContent);
          stack++;
          if (stack > maxStack) {
            clearInterval(timerInterval);
            clearInterval(loadingTipsTimerInterval);
          }
        }, 1000);
      },
      onClose(): void {
        clearInterval(timerInterval);
      }
    });

    return {
      close: (): void => {
        Swal.close();
        clearInterval(loadingTipsTimerInterval);
      }, currentProcessSubject
    };
  }

  /**
   * 获取特定长度的随机字符串
   * @param length 特定长度
   * @deprecated 请使用test/utils.ts的同名方法
   */
  randomString(length: number): string {
    return Random.nextString('', length);
  }

  /**
   * 应用在准备的阶段需要设置正在加载中状态
   * @param state 状态
   */
  setLoading(state: boolean): void {
    this.loadingSubject.next(state);
  }

  /**
   * 操作成功提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  success(callback?: () => void, description: string = '', title: string = '操作成功', options = {confirmButtonText: '确定'}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'success',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: options.confirmButtonText,
      confirmButtonColor: '#007BFF',
      showCancelButton: false
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }

  // 设置当前路由的参数
  updateCurrentRouteState(state: UnknownProperty): void {
    this.routeStates[this.routeStates.length - 1].state = state;
  }
}
