import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Page} from '../base/page';
import {Approval} from '../func/approval';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  private url = 'approval';
  constructor(private commonService: CommonService,
              private httpClient: HttpClient,
              private router: Router) { }

  public page(page: number, size: number): Observable<Page<Approval>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Approval>>(`${this.url}/page`, {params});
  }

  public allPage(page: number, size: number): Observable<Page<Approval>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Approval>>(`${this.url}/allPage`, {params});
  }

  public salePage(page: number, size: number): Observable<Page<Approval>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Approval>>(`${this.url}/salePage`, {params});
  }

  public returnPage(page: number, size: number): Observable<Page<Approval>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Approval>>(`${this.url}/returnPage`, {params});
  }

  public scrapPage(page: number, size: number): Observable<Page<Approval>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Approval>>(`${this.url}/scrapPage`, {params});
  }

  public pass(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/pass/${id.toString()}`);
  }

  public salePass(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/salePass/${id.toString()}`);
  }

  public upSalePass(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/upSalePass/${id.toString()}`);
  }

  public scrapPass(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/scrapPass/${id.toString()}`);
  }

  public repairPass(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/repairPass/${id.toString()}`);
  }

  public returnChange(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/returnChange/${id.toString()}`);
  }

  public fail(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/fail/${id.toString()}`);
  }

  public repairFail(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/repairFail/${id.toString()}`);
  }

  public saleFail(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/saleFail/${id.toString()}`);
  }

  public upSaleFail(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/upSaleFail/${id.toString()}`);
  }

  public scrapFail(id: number): Observable<null> {
    return this.httpClient.get<null>(`${this.url}/scrapFail/${id.toString()}`);
  }

  upSalePage(page: number, size: number): Observable<Page<Approval>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<Approval>>(`${this.url}/upSalePage`, {params});
  }
}
