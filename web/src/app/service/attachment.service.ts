import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';
import {NullOrUndefinedOrEmptyInterceptor} from './null-or-undefined-or-empty.interceptor';
import {Attachment} from '../func/attachment';
import {XAuthTokenInterceptor} from './x-auth-token.interceptor';
import {ApiPrefixAndMergeMapInterceptor} from '@yunzhi/ng-common';

/**
 * 附件对应的M层
 */
@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  /**
   * 下载附件前缀，一般配置后台的nginx转发使用
   */
  public static prefix = 'attachment/';
  private url = 'attachment';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 数据导出
   * @param attachment 单个导出的附件
   * @param filename 保存的文件名
   * @param params 下载参数
   */
  download(attachment: Attachment, filename: string, params: HttpParams): void {
    const url = `${this.url}/download/${attachment.id}/${attachment.file.md5}`;
    return this.downloadByFilenameAndUrl(filename, url, params);
  }

  /**
   * 指定文件名及下载的url
   * @param filename 文件名
   * @param url 下载url
   * @param params 查询参数
   */
  downloadByFilenameAndUrl(filename: string, url: string, params = new HttpParams()): void {
    params = NullOrUndefinedOrEmptyInterceptor.getCleanedParams(params)
      .append('filename', filename)
      .append('x-auth-token', XAuthTokenInterceptor.getToken());

    const link = document.createElement('a');
    link.setAttribute('href', ApiPrefixAndMergeMapInterceptor.getApiUrl(url)
      + '?' + params.toString());
    link.setAttribute('target', '_blank');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * 过滤上传文件
   * 比如过滤文件过大的
   * @param file 文件
   */
  filterUploadFile(file: File): boolean {
    return true;
  }

  /**
   * 根据附件id数组获取附件
   */
  getAttachmentByIds(attachmentIds: number[]): Observable<Attachment[]> {
    const params = new HttpParams()
      .append('attachmentIds', attachmentIds.join(','));
    return this.httpClient.get<Attachment[]>(`${this.url}/getAttachmentByIds`,{params});
  }


  /**
   * 上传文件
   * @param file 文件
   */
  upload(file: File): Observable<HttpEvent<Attachment>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<Attachment>(`${this.url}/upload`,
      formData, {reportProgress: true, observe: 'events'});
  }
}
