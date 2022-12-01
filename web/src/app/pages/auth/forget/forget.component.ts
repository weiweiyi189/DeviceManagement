// @ts-ignore
// @ts-ignore

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {config} from '../../../conf/app.conf';
import {$} from 'protractor';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

/** 显示倒计时 */
let countdown: number;
countdown = 60;


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})

export class ForgetComponent implements OnInit {

  /** 表单对象 */
  forgetForm: FormGroup;

  /**
   * 显示oneTimePassword
   */
  showOtpCode = false;


  /** 错误信息 */
  errorInfo: string;

  /** 提交状态 */
  submitting = false;

  version: string;


  constructor(private builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private commonService: CommonService) {

  }

  ngOnInit(): void {
    /** 创建表单 */
    this.forgetForm = this.builder.group({
      username: ['', [
        Validators.maxLength(20),
        Validators.required]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      captcha: ['', Validators.required],
    });
    this.errorInfo = '';
    /** 绑定按钮onclick 给邮箱发验证码 */
    document.getElementById('getCode').onclick = () => {
      const value = this.forgetForm.value;
      this.userService.getcode(value.username, value.phone)
        .subscribe(() => {
          countdown = 60;
          this.commonService.success(this.commonService.back, '发送成功！请查收');
        }, (response: HttpErrorResponse) => {
          countdown = 0;
          this.commonService.error(() => {
        }, response.error.message);
      });
    };
  }
  // 绑定input调用的函数
  reset(): void {
    const value = this.forgetForm.value;
    this.userService.codeUpdatePwd(value.username, value.captcha, value.password)
      .subscribe(() => {
        this.commonService.success(this.commonService.back, '重置密码成功！');
        window.history.back();
      }, (response: HttpErrorResponse) => {
        this.commonService.error(() => {
        }, response.error.message);
      });
  }

  // 绑定input倒计时调用的函数
  count(): void {
    // 常量 input: HTMLInputElement | null
    const input = document.getElementById('getCode') as HTMLInputElement | null;

    if (input != null) {
      // tslint:disable-next-line:triple-equals
      if (countdown == 0) {
        input.removeAttribute('disabled');
        input.value = '获取验证码';
      } else {
        input.setAttribute('disabled', String(true));
        input.value = '重新发送(' + countdown + ')';
        countdown--;
      }
      // tslint:disable-next-line:only-arrow-functions typedef
      setTimeout(function() {
        setting();
      }, 1000);
    }
  }
}

/** 显示倒计时 */
// tslint:disable-next-line:typedef
function setting() {
  console.log('ces');
// 常量 input: HTMLInputElement | null
  const input = document.getElementById('getCode') as HTMLInputElement | null;

  if (input != null) {
    // tslint:disable-next-line:triple-equals
    if (countdown == 0) {
      input.removeAttribute('disabled');
      input.value = '获取验证码';
    } else {
      input.setAttribute('disabled', String(true));
      input.value = '重新发送(' + countdown + ')';
      countdown--;
    }
    // tslint:disable-next-line:only-arrow-functions typedef
    setTimeout(function(){
      setting(); }, 1000);
  }
}

