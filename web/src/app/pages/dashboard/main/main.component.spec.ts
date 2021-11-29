import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppComponent } from '../../../app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {getTestScheduler} from 'jasmine-marbles';

describe('page -> dashboard -> MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        SweetAlert2Module.forRoot(),
        // FuncTestingModule,
        NgxEchartsModule,
        // ServiceTestingModule
      ],
      providers: [
        {provide: AppComponent, useClass: AppComponent},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    // 第一次调用detectChanges方法将触发ngOnInit方法
    fixture.detectChanges();
  });

  /**
   * 保证后台返回的数据符合组件的要求
   */
  it('should create', () => {
    // 以下代码说明组件初始化没出错
    expect(component).toBeTruthy();

    // 当组件中的数据 发生变化时，自动刷新 组件
    fixture.autoDetectChanges();

    // 接收到后台返回的数据之后，还没有错。
    // getTestScheduler().flush()
    // 使得调用cold方法返回的数据流立即发送数据：无论是以前的，还是以后的
    getTestScheduler().flush();
  });

});
