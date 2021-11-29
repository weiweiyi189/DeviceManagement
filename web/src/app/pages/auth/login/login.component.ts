import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {config} from "../../../conf/app.conf";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showUpdateBowerTips: boolean;

  /** 表单对象 */
  loginForm: FormGroup;

  /** 是否显示验证码选项 */
  showValidateCode: boolean;

  /** 验证码按钮 是否禁用 */
  verificationCodeButtonDisabled = true;

  /** 验证码按钮提示信息 */
  validateCodeInfo = '发送验证码';

  /**
   * 显示oneTimePassword
   */
  showOtpCode = false;

  /**
   * 是否显示超级密码输入框
   */
  showSuperToken = false;

  /** 错误信息 */
  errorInfo: string;

  /** 提交状态 */
  submitting = false;

  year = new Date().getFullYear();

  version: string;

  apiVersion: string;

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
    this.version = config.version;
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

  sendVerificationCode(): void {
  }
}
