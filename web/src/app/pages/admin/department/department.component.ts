import { Component, OnInit } from '@angular/core';
import {Department} from "../../../func/Department";
import {DepartmentService} from "../../../service/department.service";
import {User} from "../../../func/User";
import {HttpErrorResponse} from "@angular/common/http";
import {CommonService} from "../../../service/common.service";


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  /**
   * 分页信息
   */
  public params = {
    page: 0,
    size: 10,
  };

  /* 分页数据 */
  departments = {
    totalPages: 0,
    content: new Array<Department>()
  };
  constructor(private departmentService: DepartmentService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.pageAll();
  }

  delete(department: Department): void {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.departmentService.delete(department.id).subscribe(() => {
          this.commonService.success(() => {
          }, '删除成功');
          this.pageAll();
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '是否删除部门? 会将其下的设备全部删除');
  }

  onPageSelected(page: number): void {
    this.params.page = page;
    this.pageAll();
  }

  onSizeSelected(size: number): void {
    this.params.size = size;
    this.pageAll();
  }

  public pageAll(): void {
    this.departmentService.getAll(this.params.page,
      this.params.size)
      .subscribe((response: { totalPages: number, content: Array<Department> }) => {
        this.departments = response;
      });
  }

}
