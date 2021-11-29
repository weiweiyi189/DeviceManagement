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

  private handleHttpException(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    switch (error.status) {
      case 401:
        if (!this.router.url.startsWith(`/login`)) {
          // 未登录，跳转到登录页
          this.router.navigateByUrl('/login');
        }
        break;
      default:
        break;
    }
    // 最终将异常抛出来，便于组件个性化处理
    throw error;
  }
}
