import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../func/User';
import {CommonService} from '../../../../service/common.service';
import {AuthService} from '../../../../service/auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {DepartmentService} from '../../../../service/department.service';
import {EquipmentService} from '../../../../service/equipment.service';
import {Department} from '../../../../func/Department';
import {Type} from '../../../../func/Type';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  equipmentForm: FormGroup;
  state: Array<User>;

  constructor(private commomService: CommonService,
              private commonService: CommonService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router,
              private equipmentService: EquipmentService,
              private builder: FormBuilder){ }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.equipmentForm = this.builder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      type: [null, Validators.required],
      internalNumber: ['', Validators.required],
      place: ['', Validators.required],
      department: [null, Validators.required],
    });
  }

  /** https://angular.cn/guide/form-validation#built-in-validators */
  get name(): AbstractControl {
    return this.equipmentForm.get('name');
  }

  get code(): AbstractControl {
    return this.equipmentForm.get('code');
  }



  submit(): void {
    this.equipmentService.save(this.equipmentForm.value).subscribe(() => {
      this.commomService.success(() => {
        this.commonService.back();
      }, '新增成功');
    }, (response: HttpErrorResponse) => {
      this.commonService.httpError(response);
    });
  }

  bindEuqipment(theDepartment: Department): void {
    if (theDepartment && theDepartment.id) {
      // 合法，设置 college
      this.equipmentForm.patchValue({
        department: theDepartment
      });
    } else {
      this.equipmentForm.patchValue({
        department: null
      });
    }
  }

  bindType(thType: Type): void {
    if ( thType && thType.id) {
      // 合法，设置 college
      this.equipmentForm.patchValue({
        type: thType
      });
    } else {
      this.equipmentForm.patchValue({
        type: null
      });
    }
  }
}
