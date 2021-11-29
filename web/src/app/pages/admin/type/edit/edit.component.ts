import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../func/User';
import {CommonService} from '../../../../service/common.service';
import {AuthService} from '../../../../service/auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeService} from '../../../../service/type.service';
import {Department} from '../../../../func/Department';
import {Type} from '../../../../func/Type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  typeForm: FormGroup;
  state: Array<User>;

  constructor(private commomService: CommonService,
              private commonService: CommonService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private typeService: TypeService,
              private builder: FormBuilder){ this.createForm(); }

  ngOnInit(): void {
    this.getEditType();
  }

  createForm(): void {
    this.typeForm = this.builder.group({
      name: [''],
    });
  }

  initForm(type: Type): void {
    this.typeForm.setValue({
      name: type.name,
    });
  }

  /**
   * 获取要编辑的设备
   */
  public getEditType(): void {
    this.route.params.subscribe(params => {
      this.typeService.getTypeById(params.id).subscribe((type: Type) => {
        console.log(type);
        this.initForm(type);
      });
    });
  }

  /** https://angular.cn/guide/form-validation#built-in-validators */
  get name(): AbstractControl {
    return this.typeForm.get('name');
  }

  submit(): any {
    this.updateDepartment(this.typeForm.value);
  }

  public updateDepartment(type: Type): any {
    this.route.params.subscribe(params => {
      this.typeService.update(params.id, type).subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        }, '类型修改成功');
      }, (response: HttpErrorResponse) => {
        this.commonService.error(() => {
        }, response.error.message);
      });
    });
  }
}

