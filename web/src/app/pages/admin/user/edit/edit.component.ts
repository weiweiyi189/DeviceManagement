import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../func/User';
import {CommonService} from '../../../../service/common.service';
import {UserService} from '../../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../service/auth.service';
import {Department} from '../../../../func/Department';
import {HttpErrorResponse} from '@angular/common/http';
import {CommonValidators} from '../../../user/user/CommonValidators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userForm: FormGroup;
  roleForm: FormControl;
  sexForm: FormControl;
  user: User;
  currentUser: User;



  constructor(private builder: FormBuilder,
              private commonService: CommonService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private commonValidators: CommonValidators) {}

  ngOnInit(): void {
    this.authService.getCurrentLoginUser$()
      .subscribe((user: User) => {
        this.currentUser = user;
        this.getEditUser();
      });
  }

  public createForm(): void {
    this.userForm = this.builder.group({
      department: null,
      name: ['', Validators.required],
      username: ['', Validators.required, this.commonValidators.usernameNotExist(this.user)],
      phone: ['', [Validators.required, Validators.email]],
      jobNumber: ['', Validators.required],
    });
    this.sexForm = new FormControl();
    this.roleForm = new FormControl();
  }

  initForm(user: User): void {
    this.userForm.setValue({
      name: user.name,
      phone: user.phone,
      username: user.username,
      jobNumber: user.jobNumber,
      department: user.department
    });
    this.roleForm.setValue(user.role);
    this.sexForm.setValue(user.sex);
  }

  /**
   * 获取要编辑的设备
   */
  public getEditUser(): void {
    this.route.params.subscribe(params => {
      this.userService.getUserById(params.id).subscribe((user: User) => {
        this.user = user;
        this.createForm();
        this.initForm(user);
      });
    });
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


  submit(): any {
    const user = new User();
    user.name = this.userForm.get('name')?.value;
    user.username = this.userForm.get('username')?.value;
    user.jobNumber = this.userForm.get('jobNumber')?.value;
    user.phone = this.userForm.get('phone')?.value;
    user.role = this.roleForm.value;
    user.sex = this.sexForm.value;
    user.department = this.userForm.get('department').value;
    this.updateUser(user);
  }

  public updateUser(user: User): any {
    this.route.params.subscribe(params => {
      this.userService.update(params.id, user).subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        }, '用户修改成功');
      }, (response: HttpErrorResponse) => {
        this.commonService.error(() => {
        }, response.error.message);
      });
    });
  }


}
