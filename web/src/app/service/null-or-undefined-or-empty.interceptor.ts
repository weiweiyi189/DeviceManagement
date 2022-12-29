import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {isNotNullOrUndefined} from '@yunzhi/utils';

/**
 * 过滤掉params中的null或undefined或空字符串
 */
export class NullOrUndefinedOrEmptyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * 过滤到null及undefined
     */
    const cleanedParams = NullOrUndefinedOrEmptyInterceptor.getCleanedParams(request.params);

    request = request.clone({params: cleanedParams});
    return next.handle(request);
  }

  public static getCleanedParams(params: HttpParams): HttpParams {
    let cleanedParams = new HttpParams();
    params.keys().forEach(x => {
      const value = params.get(x);
      // tslint:disable-next-line:no-non-null-assertion
      if (isNotNullOrUndefined(value) && value!.length > 0 && value !== 'NaN' && value !== 'undefined' && value !== 'null') {
        // tslint:disable-next-line:no-non-null-assertion
        cleanedParams = cleanedParams.append(x, params.get(x)!);
      }
    });
    return cleanedParams;
  }
}
