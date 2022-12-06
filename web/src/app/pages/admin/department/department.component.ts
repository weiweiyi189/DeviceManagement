import { Component, OnInit } from '@angular/core';
import {Department} from "../../../func/Department";
import {DepartmentService} from "../../../service/department.service";


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
  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.pageAll();
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
