import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {config} from '../../../conf/app.conf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** 表单对象 */
  loginForm: FormGroup;

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
              private router: Router) {

  }

  ngOnInit(): void {
    /** 创建表单 */
    this.loginForm = this.builder.group({
      username: ['', [
        Validators.maxLength(20),
        Validators.required]],
      password: ['', Validators.required],
    });
    this.errorInfo = '';
  }

  login(): void {
    this.authService.login(this.loginForm.value)
      .subscribe(() => {
        this.authService.requestCurrentLoginUser(() => {
          this.router.navigateByUrl('dashboard');
      }); }, () => {
        this.errorInfo = '登录失败，请检查您的用户名、密码';
      });
  }
}
