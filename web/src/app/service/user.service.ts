import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, tap} from 'rxjs/operators';
import {VUser} from '../base/vuser';
import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {User} from '../func/User';
import {Page} from '../base/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentLoginUser: User;
  private currentLoginUserSubject = new ReplaySubject<User>(1);
  public currentLoginUser$: Observable<User>;
  private url = 'user';

  constructor(private commonService: CommonService,
              private httpClient: HttpClient,
              private router: Router) {
    this.currentLoginUser$ = this.currentLoginUserSubject.asObservable();
    this.getCurrentLoginUser();
  }

  private getCurrentLoginUser(): void {
    const appOnReadyItem = this.commonService.getAppOnReadyItem();

    this.httpClient.get<User>(`${this.url}/me`)
      .subscribe(user => {
        appOnReadyItem.ready = true;
        this.setCurrentLoginUser(user);
      }, () => {
        appOnReadyItem.ready = true;
        this.setCurrentLoginUser(null);
      });
  }

  getAllCharge(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.url}/getAllCharge`);
  }

  /**
   * 获取登录用户时，应该结合appOnReady。示例：
   * this.commonService.appOnReady(() => {const user = this.userService.getCurrentUser();});
   */
  getCurrentUser(): User | null {
    return this.currentLoginUser;
  }

  /**
   * 通过Id获取用户
   */
  public getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${userId.toString()}`);
  }

  /**
   * 更新
   */
  public update(userId: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/${userId.toString()}`, user);
  }

// 发送验证码
  public getcode(staffNumber: string, mailAddress: string): Observable<void> {
    // const headers = new HttpParams();
    // headers.append('staffNumber', staffNumber);
    // headers.append('mailAddress', mailAddress);
    const params: { [key: string]: any } = {
      staffNumber: String(staffNumber),
      mailAddress: String(mailAddress),
    };
    console.log({params});
    return this.httpClient.get<void>(`mail/getCode`, {params});
  }

  // 验证找回
  public codeUpdatePwd(num: string, codes: string, password: string): Observable<void> {
    const params: { [key: string]: any } = {
      num: String(num),
      codes: String(codes),
      password: String(password),
    };
    console.log({params});
    return this.httpClient.get<void>(`user/codeUpdatePwd`, {params});
  }

  login(user: User): Observable<User> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // 添加认证信息
    headers = headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<User>(this.url + '/me', {headers}).pipe(tap((data) => {
      this.setCurrentLoginUser(data);
    }));
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.url}/logout`).pipe(map(() => {
      this.setCurrentLoginUser(null);
    }));
  }

  /**
   * 用户注册
   * @param user 用户
   */
  register(user: User): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/register`, user);
  }

  /**
   * 设置当前登录用户
   * @param user 登录用户
   */
  setCurrentLoginUser(user: User): void {
    this.currentLoginUser = user;
    this.currentLoginUserSubject.next(user);
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param userId 用户
   */
  public getAll(page: number, size: number): Observable<Page<User>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size),
    };

    return this.httpClient.get<Page<User>>(`${this.url}/getAll`, {params});
  }

  /**
   * 校验密码是否正确
   * @param password 密码
   */
  public checkPasswordIsRight(password: string): Observable<boolean> {
    const vUser = new VUser();
    vUser.password = password;
    return this.httpClient.post<boolean>(`${this.url}/checkPasswordIsRight`, vUser);
  }

  /**
   * 验证原密码是否正确
   */
  public oldPasswordValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.checkPasswordIsRight(ctrl.value)
        .pipe(map((isRight: boolean) => (isRight ? null : {passwordError: true})),
          catchError(() => null));
    };
  }

  /**
   * 验证新密码与确认密码是否相同
   * @param control 表单
   */
  public confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const newPassword = control.get('newPassword').value;
    const confirmNewPassword = control.get('confirmNewPassword').value;

    // 判断确认密码与新密码是否相同
    if (newPassword && confirmNewPassword) {
      return newPassword !== confirmNewPassword ? {confirmPasswordError: true} : null;
    }
    return null;
  }

  /**
   * 登录用户修改密码
   * @param newPassword 新密码
   * @param oldPassword 旧密码
   */
  public updatePassword(newPassword: string, oldPassword: string): Observable<void> {
    const vUser = new VUser();
    vUser.password = oldPassword;
    vUser.newPassword = encodeURIComponent(newPassword);
    return this.httpClient.put<void>(`${this.url}/updatePassword`, vUser);
  }

  /**
   * 重置密码
   * @param id  用户id
   * @param student  学生
   */
  public resetPassword(id: number): Observable<void> {
    console.log(this.url + '/resetPassword/' + id);
    return this.httpClient.put<void>(this.url + '/resetPassword/' + id , id);
  }

  save(user: User): any {
    console.log(user);
    return this.httpClient.post(`${this.url}`, user);
  }

  public delete(userId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.url}/${userId.toString()}`);
  }

  query(params: { size?: number; name?: any; page?: number; jobNumber?: any }): any {
    /* 设置默认值 */
    if (params.page === undefined) {
      params.page = 0;
    }
    if (params.size === undefined) {
      params.size = 10;
    }
    const PARAM = {
      name: params.name ? params.name : '',
      jobNumber: params.jobNumber ? params.jobNumber : '',
      page: params.page.toLocaleString(),
      size: params.size.toLocaleString()
    };
    return this.httpClient.get<{ totalPages: number, content: Array<User> }>(`${this.url}/query`, {params: PARAM});
  }
}
