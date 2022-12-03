import { Component, OnInit } from '@angular/core';
import {Department} from '../../../../func/Department';
import {Router} from '@angular/router';
import {AuthService} from '../../../../service/auth.service';
import {CommonService} from '../../../../service/common.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../func/User';
import {UserService} from '../../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  userForm: FormGroup;
  roleForm: FormControl;
  sexForm: FormControl;
  user: User;
  currentUser: User;

  constructor(private builder: FormBuilder,
              private commonService: CommonService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentLoginUser$()
      .subscribe((user: User) => {
        this.currentUser = user;
        this.initForm();
      });
  }

  public initForm(): void {
    this.userForm = this.builder.group({
      department: [null],
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      code: ['', Validators.required],
    });
    this.sexForm = new FormControl(null, Validators.required);
    this.roleForm = new FormControl(null, Validators.required);
  }

  bindEuqipment(theDepartment: Department): void {
    if (theDepartment && theDepartment.id) {
      // 合法，设置 college
      this.userForm.patchValue({
        department: theDepartment
      });
    } else {
      this.userForm.patchValue({
        department: null
      });
    }
  }

  submit(): void {
    if (this.userForm.get('department').value?.user && this.roleForm.value === 3) {
      this.commonService.error(() => {}, '所选部门已有经理');
      return;
    }
    this.user = new User();
    this.user.name = this.userForm.get('name').value;
    this.user.username = this.userForm.get('username').value;
    this.user.jobNumber = this.userForm.get('code').value;
    this.user.phone = this.userForm.get('phone').value;
    this.user.role = this.roleForm.value;
    this.user.sex = this.sexForm.value;
    this.user.department = this.userForm.get('department').value;
    if (!this.user.department && this.currentUser.role === 3) {
      this.user.department = this.currentUser.department;
    }
    this.userService.save(this.user).subscribe(() => {
      this.commonService.success(() => {
        this.commonService.back();
      }, '人员新增成功，默认密码：hebut');
    }, (response: HttpErrorResponse) => {
      this.commonService.httpError(response);
    });
  }
}
