import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../func/User';
import {CommonService} from '../../../../service/common.service';
import {AuthService} from '../../../../service/auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../../../../service/department.service';
import {Department} from '../../../../func/Department';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  departmentForm: FormGroup;
  state: Array<User>;

  constructor(private commomService: CommonService,
              private userService: UserService,
              private commonService: CommonService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private departmentService: DepartmentService,
              private builder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userService.getAllCharge()
      .subscribe((data) => {
        this.state = data;
      });
    this.getEditDepartment();
  }

  /**
   * 获取要编辑的设备
   */
  public getEditDepartment(): void {
    this.route.params.subscribe(params => {
      this.departmentService.getDepartmentById(params.id).subscribe((department: Department) => {
        this.initForm(department);
      });
    });
  }

  createForm(): void {
    this.departmentForm = this.builder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      userId: [''],
    });
  }

  initForm(department: Department): void {
    this.departmentForm.setValue({
      name: department.name,
      code: department.code,
      userId: department.user?.id ? department.user?.id : null
    });
  }

  /** https://angular.cn/guide/form-validation#built-in-validators */
  get name(): AbstractControl {
    return this.departmentForm.get('name');
  }

  get code(): AbstractControl {
    return this.departmentForm.get('code');
  }

  get userId(): AbstractControl {
    return this.departmentForm.get('userId');
  }


  submit(): any {
    const department = new Department({
        name: this.name.value,
        code: this.code.value,
        user: new User({
          id: this.userId.value
        })
      }
    );
    this.updateDepartment(department);
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
