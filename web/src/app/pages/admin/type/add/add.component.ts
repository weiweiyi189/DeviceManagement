import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../func/User';
import {CommonService} from '../../../../service/common.service';
import {AuthService} from '../../../../service/auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {DepartmentService} from '../../../../service/department.service';
import {TypeService} from '../../../../service/type.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  typeForm: FormGroup;
  state: Array<User>;

  constructor(private commomService: CommonService,
              private commonService: CommonService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router,
              private typeService: TypeService,
              private builder: FormBuilder){ }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.typeForm = this.builder.group({
      name: [''],
    });
  }

  /** https://angular.cn/guide/form-validation#built-in-validators */
  get name(): AbstractControl {
    return this.typeForm.get('name');
  }

  submit(): void {
    this.typeService.save(this.typeForm.value).subscribe(() => {
      this.commomService.success(() => {
        this.commonService.back();
      }, '新增成功');
    }, (response: HttpErrorResponse) => {
      this.commonService.httpError(response);
    });
  }
}

