import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../base/page';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {Department} from '../func/Department';
import {User} from "../func/User";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private url = 'department';
  constructor(private commonService: CommonService,
              private httpClient: HttpClient, ) { }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param userId 用户
   */
  public getAll(page: number, size: number): Observable<Page<Department>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Department>>(`${this.url}/getAll`, {params});
  }

  public delete(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.url}/${id.toString()}`);
  }

  /**
   * 通过Id获取用户
   */
  public getDepartmentById(userId: number): Observable<Department> {
    return this.httpClient.get<Department>(`${this.url}/${userId.toString()}`);
  }

  /**
   * 更新
   */
  public update(userId: number, department: Department): Observable<Department> {
    console.log(department);
    return this.httpClient.put<Department>(`${this.url}/${userId.toString()}`, department);
  }

  findAll(): any{
    return this.httpClient.get<Array<Department>>(`${this.url}`);
  }

  save(department: Department): any {
    console.log(department);
    return this.httpClient.post(`${this.url}`, department);
  }
}
