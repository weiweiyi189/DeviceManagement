import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let commonService: CommonService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    commonService = TestBed.get(CommonService);
    const httpClient = TestBed.get(HttpClient) as HttpClient;
    const router = TestBed.get(Router);
    service = new UserService(commonService, httpClient, router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('resetPassword', () => {
    const id = Math.floor(Math.random() * 100);
    let resultId;
    let called = false;
    service.resetPassword(id)
      .subscribe(result => {
        resultId = result;
        called = true;
      });
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`user/resetPassword/${id}`);
    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toBe(id);
    // 返回值为可被观察者，该观察者携带的内容为`void`
    expect(called).toBeFalsy();
    req.flush(of());
    expect(called).toBeTruthy();
  });
 });
