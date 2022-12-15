import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, finalize, mergeMap} from 'rxjs/operators';
import {CommonService} from '../service/common.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {config} from '../conf/app.conf';
import {isDefined} from '../core/secondUtils';

/**
 * Yunzhi拦截器，用于实现添加url，添加header，全局异常处理
 * 个别请求不需要进行拦截的，请在请求的header中加入：do_not_intercept,值为true
 */
@Injectable({
  providedIn: 'root'
})
export class YunzhiInterceptor implements HttpInterceptor {
  static DONT_INTERCEPT_HEADER_KEY = 'do_not_intercept';

  constructor(private commonService: CommonService,
              private authService: AuthService,
              private router: Router) {

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    /**
     * 为request加上服务端前缀
     */
    let url = req.url;

    // header中带有do_not_intercept，且值为true，则不添加url前缀
    if (('true' !== req.headers.get(YunzhiInterceptor.DONT_INTERCEPT_HEADER_KEY))
      && !url.startsWith('https://') && !url.startsWith('http://')) {
      url = config.server + url;
    }

    let request = req.clone({url});
    /**
     * 设置headers，防止弹出对话框
     * https://stackoverflow.com/questions/37763186/spring-boot-security-shows-http-basic-auth-popup-after-failed-login
     */
    let headers = request.headers;
    headers = headers.append('X-Requested-With', 'XMLHttpRequest');
    request = request.clone({headers});

    /**
     * 过滤到null及undefined
     */
    let cleanedParams = new HttpParams();
    request.params.keys().forEach(x => {
      if (isDefined(request.params.get(x))) {
        cleanedParams = cleanedParams.append(x, req.params.get(x));
      }
    });


    request = request.clone({headers, params: cleanedParams});

    this.commonService.setLoading(true);

    /**
     * 数据过滤
     */
    return next.handle(request).pipe(
      // mergeMap = merge + map
      mergeMap((event: any) => {
        return of(event);
      }),
      finalize(() => this.commonService.setLoading(false)),
      catchError((error: HttpErrorResponse) => {
        return this.handleHttpException(error);
      })
    );
  }

  showError(error: HttpErrorResponse, messagePrefix: string): void {
    let title = error.status + ' ' + messagePrefix;
    if (error.error && typeof error.error.message !== 'undefined') {
      title = error.error.message;
    }

    const description = error.url + ': ' + title + '。如有问题请联系开发者(微信同号): 18978855737';
    this.commonService.error(() => {}, description, error.status.toString());
  }

  private handleHttpException(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    switch (error.status) {
      case 401:
        if (!this.router.url.startsWith(`/login`)) {
          // 未登录，跳转到登录页
          this.router.navigateByUrl('/login');
        }
        break;
      case 400:
        this.showError(error, '请求参数错误');
        break;
      case 403:
        this.showError(error, '您无此操作权限');
        break;
      case 404:
        this.showError(error, '资源未找到');
        break;
      case 405:
        this.showError(error, '方法不支持');
        break;
      case 500:
        this.showError(error, '服务器逻辑错误');
        break;
      case 502:
        this.showError(error, '服务器宕机');
        break;
      case 0:
        this.showError(error, '网络错误');
        break;
      default:
        this.showError(error, '未知错误。');
        break;
    }
    // 最终将异常抛出来，便于组件个性化处理
    throw error;
  }
}
