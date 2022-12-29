import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AttachmentService} from './attachment.service';
import {ApiPrefixAndMergeMapInterceptor} from '@yunzhi/ng-common';
import {MyFile} from "../func/my-file";

@Injectable({
  providedIn: 'root'
})
export class MyFileService {
  public static prefix = AttachmentService.prefix;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取文件完整的相对路径
   * @param file 文件
   */
  // tslint:disable-next-line:typedef
  static getFullPath(file: MyFile) {
    return '/' + file.path + '/' + file.name;
  }

  /**
   * 获取文件值
   * @param file 文件
   */
  getJson(file: MyFile): Observable<any> {
    const httpHeaders = new HttpHeaders().append(ApiPrefixAndMergeMapInterceptor.DONT_INTERCEPT_HEADER_KEY, 'true');
    return this.httpClient.get<Blob>(file.path + '/' + file.name, {
      headers: httpHeaders
    });
  }
}
