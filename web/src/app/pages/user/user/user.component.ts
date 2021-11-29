import { Component, OnInit } from '@angular/core';
import {User} from '../../../func/User';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../service/auth.service';
import {config} from '../../../conf/app.conf';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  /**
   * 分页信息
   */
  public params = {
    page: 0,
    size: 10,
  };

  /* 查询参数 */
  queryParams = {
    page: 0,
    status: undefined,
    size: this.params.size,
    name: new FormControl(),
    jobNumber: new FormControl()
  };

  /* 分页数据 */
  users = {
    totalPages: 0,
    content: new Array<User>()
  };
  private currentUser: User;

  constructor(private userService: UserService,
              private commonService: CommonService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.pageAll();
  }

  public pageAll(): void {
    this.userService.getAll(this.params.page,
      this.params.size)
      .subscribe((response: { totalPages: number, content: Array<User> }) => {
        this.users = response;
        console.log(response);
        // this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
      });
  }

  onPageSelected(page: number): void {
    this.params.page = page;
    this.pageAll();
  }

  onSizeSelected(size: number): void {
    config.size = size;
    this.ngOnInit();
  }

  /**
   * 参数初始化
   */
  paramsInit(): void {
    this.params.page = 0;
    this.params.size = config.size;

    // 获取历史参数
    const params = this.commonService.getCurrentRouteState();

    if (params.page) {
      this.params.page = params.page as number;
    }
    if (params.size) {
      this.params.size = params.size as number;
    }
  }


  onQuery(): void {
    this.loadData();
  }
  clear(): void {
    this.queryParams.name = new FormControl();
    this.queryParams.jobNumber = new FormControl();
    this.loadData();
  }

  /**
   * 加载数据
   */
  loadData(): void {
    const queryParams = {
      page: this.params.page,
      size: config.size,
      name: this.queryParams.name.value,
      jobNumber: this.queryParams.jobNumber.value
    };

    this.userService.query(queryParams)
      .subscribe((response: { totalPages: number, content: Array<User> }) => {
        this.users = response;
        // this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
      });
  }



  delete(user: User): void {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.userService.delete(user.id).subscribe(() => {
          this.commonService.success(() => {
          }, '删除成功');
          this.pageAll();
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '即将删除人员');
  }
}

