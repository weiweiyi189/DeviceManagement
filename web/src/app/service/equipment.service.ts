import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../base/page';
import {User} from '../func/User';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Equipment} from '../func/Equipment';
import {Department} from "../func/Department";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private url = 'equipment';
  constructor(private commonService: CommonService,
              private httpClient: HttpClient,
              private router: Router) { }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param userId 用户
   */
  public getToRepair(page: number, size: number): Observable<Page<Equipment>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Equipment>>(`${this.url}/getToRepair`, {params});
  }

  save(equipment: Equipment): any {
    console.log(equipment);
    return this.httpClient.post(`${this.url}`, equipment);
  }

  public delete(equipmentId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.url}/${equipmentId.toString()}`);
  }

  /**
   * 更新
   */
  public report(equipmentId: number, equipment: Equipment): Observable<Equipment> {
    return this.httpClient.put<Equipment>(`${this.url}/report/${equipmentId.toString()}`, equipment);
  }

  /**
   * 更新
   */
  public repair(equipmentId: number, equipment: Equipment): Observable<Equipment> {
    return this.httpClient.put<Equipment>(`${this.url}/repair/${equipmentId.toString()}`, equipment);
  }

  public toRepair(equipmentId: number, equipment: Equipment): Observable<Equipment> {
    return this.httpClient.put<Equipment>(`${this.url}/toRepair/${equipmentId.toString()}`, equipment);
  }

  public getAll(page: number, size: number): Observable<Array<Equipment>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Array<Equipment>>(`${this.url}/getAll`, {params});
  }

  /**
   * 更新
   */
  public scrap(equipmentId: number, equipment: Equipment): Observable<Equipment> {
    return this.httpClient.put<Equipment>(`${this.url}/scrap/${equipmentId.toString()}`, equipment);
  }

  query(params: { size?: number; name?: any; page?: number; internalNumber?: any; type?: any, place?: any; states?: any }): any {
    /** 初始化分页参数 */
    const PARAMS: { [key: string]: any } = {
      page: String(params.page),
      size: String(params.size),
    };
    /** 过滤参数 */
    if (params.type) {
      PARAMS.type = params.type;
    }
    if (params.states) {
      console.log(params.states);
      PARAMS.states = params.states;
    }else {
      if (params.states === 0){
        PARAMS.states = 0;
      }
    }
    if (params.name) {
      PARAMS.name = params.name;
    }
    if (params.internalNumber) {
      PARAMS.internalNumber = params.internalNumber;
    }
    if (params.place) {
      PARAMS.place = params.place;
    }
    console.log(PARAMS);
    return this.httpClient.get<{ totalPages: number, content: Array<User> }>(`${this.url}/query`, {params: PARAMS});
  }

  /**
   * 根据id获取订单
   * @param id  订单id
   */
  public getById(id: number): Observable<Equipment> {
    return this.httpClient.get<Equipment>(`${this.url}/${id}`);
  }

  /**
   * 更新
   */
  update(equipmentId: number, equipment: Equipment): Observable<Equipment> {
    return this.httpClient.put<Equipment>(`${this.url}/${equipmentId.toString()}`, equipment);
  }

  public borrow(equipmentId: number, equipment: Equipment, department: Department): Observable<Equipment> {
    return this.httpClient.put<Equipment>(`${this.url}/borrow/${department.id.toString()}`, equipment);
  }

  public return(equipmentId: number, equipment: Equipment): Observable<Equipment> {
    return this.httpClient.put<Equipment>(`${this.url}/return/${equipmentId.toString()}`, equipment);
  }

  getAllByBorrow(page: number, size: number): any {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Equipment>>(`${this.url}/getBorrow`, {params});
  }
}
