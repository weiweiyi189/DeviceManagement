import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../func/User';
import {CommonService} from '../../../../service/common.service';
import {AuthService} from '../../../../service/auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../../../../service/department.service';
import {Department} from '../../../../func/Department';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  departmentForm: FormGroup;
  state: Array<User>;

  constructor(private commomService: CommonService,
              private commonService: CommonService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private departmentService: DepartmentService,
              private builder: FormBuilder){ this.createForm(); }

  ngOnInit(): void {
    this.getEditDepartment();
  }

  /**
   * 获取要编辑的设备
   */
  public getEditDepartment(): void {
    this.route.params.subscribe(params => {
      this.departmentService.getDepartmentById(params.id).subscribe((department: Department) => {
        console.log(department);
        this.initForm(department);
      });
    });
  }

  createForm(): void {
    this.departmentForm = this.builder.group({
      name: [''],
      code: [''],
    });
  }

  initForm(department: Department): void {
    this.departmentForm.setValue({
      name: department.name,
      code: department.code,
    });
  }

  /** https://angular.cn/guide/form-validation#built-in-validators */
  get name(): AbstractControl {
    return this.departmentForm.get('name');
  }

  get code(): AbstractControl {
    return this.departmentForm.get('code');
  }



  submit(): any {
    this.updateDepartment(this.departmentForm.value);
  }

  public updateDepartment(department: Department): any {
    this.route.params.subscribe(params => {
      this.departmentService.update(params.id, department).subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        }, '部门信息修改成功');
      }, (response: HttpErrorResponse) => {
        this.commonService.error(() => {
        }, response.error.message);
      });
    });
  }

}
