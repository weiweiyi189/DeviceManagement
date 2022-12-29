import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponseBase
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class XAuthTokenInterceptor implements HttpInterceptor {
  /**
   * 由缓存中获取token，防止页面刷新后失效
   */
  private static token = window.sessionStorage.getItem('x-auth-token');

  constructor() {
  }

  static getToken() {
    return XAuthTokenInterceptor.token;
  }

  /**
   * 设置token
   * 如果接收到了新的token则更新，否则什么也不做
   * @param xAuthToken token
   */
  private setToken(xAuthToken: string): void {
    if (XAuthTokenInterceptor.token !== xAuthToken) {
      XAuthTokenInterceptor.token = xAuthToken;
      window.sessionStorage.setItem('x-auth-token', XAuthTokenInterceptor.token);
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.params.has('x-auth-token')) {
      this.setToken(request.params.get('x-auth-token'));
    } else if (XAuthTokenInterceptor.token !== null) {
      request = request.clone({setHeaders: {'x-auth-token': XAuthTokenInterceptor.token}});
    }
    return next.handle(request).pipe(tap(input => {
      // 仅当input类型为HttpResponseBase，才尝试获取token并更新
      if (input instanceof HttpResponseBase) {
        const httpHeader = input.headers;
        const xAuthToken = httpHeader.get('x-auth-token');
        if (xAuthToken !== null) {
          this.setToken(xAuthToken);
        }
      }
    }));
  }
}
