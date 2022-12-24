import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../../../func/User';
import {CommonService} from '../../../../service/common.service';
import {AuthService} from '../../../../service/auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DepartmentService} from '../../../../service/department.service';
import {UserService} from '../../../../service/user.service';
import {Department} from '../../../../func/Department';
import {SettingValidators} from "./setting-validators";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  departmentForm: FormGroup;
  state: Array<User>;

  constructor(private commomService: CommonService,
              private commonService: CommonService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router,
              private userService: UserService,
              private departmentService: DepartmentService,
              private builder: FormBuilder){ }

  ngOnInit(): void {
    this.userService.getAllCharge()
      .subscribe((data) => {
      this.state = data;
    });
    this.initForm();
  }

  initForm(): void {
    this.departmentForm = this.builder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      userId: [''],
      webHook: ['', SettingValidators.isRightWebhook]
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

  get webHook(): AbstractControl {
    return this.departmentForm.get('webHook');
  }



  submit(): void {
    const department = new Department({
        name: this.name.value,
        code: this.code.value,
        webHook: this.webHook.value,
        user: new User({
          id: this.userId.value
        })
      }
    );
    this.departmentService.save(department).subscribe(() => {
      this.commomService.success(() => {
        this.commonService.back();
      }, '部门新增成功');
    }, (response: HttpErrorResponse) => {
      this.commonService.httpError(response);
    });
  }
}
