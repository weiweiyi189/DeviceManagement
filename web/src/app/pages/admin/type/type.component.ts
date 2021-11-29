import { Component, OnInit } from '@angular/core';
import {User} from '../../../func/User';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {Type} from '../../../func/Type';
import {TypeService} from '../../../service/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  /**
   * 分页信息
   */
  public params = {
    page: 0,
    size: 10,
  };

  /* 分页数据 */
  types = {
    totalPages: 0,
    content: new Array<Type>()
  };
  constructor(private typeService: TypeService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.pageAll();
  }

  public pageAll(): void {
    this.typeService.getAll(this.params.page,
      this.params.size)
      .subscribe((response: { totalPages: number, content: Array<Type> }) => {
        this.types = response;
        console.log(response);
        // this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
      });
  }

  delete(type: Type): void {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.typeService.delete(type.id).subscribe(() => {
          this.commonService.success(() => {
          }, '删除成功');
          this.pageAll();
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '即将删除类型');
  }
}
