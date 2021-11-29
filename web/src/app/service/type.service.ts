import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Page} from '../base/page';
import {Type} from '../func/Type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private url = 'type';
  constructor(private commonService: CommonService,
              private httpClient: HttpClient,
              private router: Router) { }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param userId 用户
   */
  public getAll(page: number, size: number): Observable<Page<Type>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Type>>(`${this.url}/getAll`, {params});
  }

  save(type: Type): any {
    console.log(type);
    return this.httpClient.post(`${this.url}`, type);
  }

  public delete(typeId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.url}/${typeId.toString()}`);
  }

  findAll(): any{
    return this.httpClient.get<Array<Type>>(`${this.url}`);
  }

  /**
   * 通过Id获取用户
   */
  public getTypeById(typeId: number): Observable<Type> {
    return this.httpClient.get<Type>(`${this.url}/${typeId.toString()}`);
  }

  /**
   * 更新
   */
  public update(typeId: number, type: Type): Observable<Type> {
    return this.httpClient.put<Type>(`${this.url}/${typeId.toString()}`, type);
  }

}
