import { Component, OnInit } from '@angular/core';
import {Equipment} from '../../../../func/Equipment';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../func/User';
import {CommonService} from '../../../../service/common.service';
import {AuthService} from '../../../../service/auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {EquipmentService} from '../../../../service/equipment.service';
import {Department} from '../../../../func/Department';
import {Type} from '../../../../func/Type';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.sass']
})
export class BorrowComponent implements OnInit {

  equipmentForm: FormGroup;
  state: Array<User>;
  department: Department;
  equipment: Equipment;

  constructor(private commomService: CommonService,
              private commonService: CommonService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private equipmentService: EquipmentService,
              private builder: FormBuilder){    this.createForm(); }

  ngOnInit(): void {
    console.log(this.department);
    this.getEditEquipment();
  }

  /**
   * 获取要编辑的设备
   */
  public getEditEquipment(): void {
    this.route.params.subscribe(params => {
      this.equipmentService.getById(params.id).subscribe((equipment: Equipment) => {
        console.log(equipment);
        this.equipment = equipment;
        this.initForm(equipment);
      });
    });
  }

  createForm(): void {
    this.equipmentForm = this.builder.group({
      name: [''],
      model: [''],
      type: null,
      internalNumber: [''],
      place: [''],
    });
  }

  initForm(equipment: Equipment): void {
    this.equipmentForm.setValue({
      name: equipment.name,
      model: equipment.model,
      type: equipment.type,
      internalNumber: equipment.internalNumber,
      place: equipment.place,
    });
  }

  get name(): AbstractControl {
    return this.equipmentForm.get('name');
  }

  get code(): AbstractControl {
    return this.equipmentForm.get('code');
  }



  submit(): any {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.equipmentService.borrow(this.equipment.id, this.equipment, this.department).subscribe(() => {
          this.commonService.success(() => {
            this.commonService.back();
          }, '借用成功');
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '是否确认借用');
  }

  public updateEquipments(equipment: Equipment): any {
    this.route.params.subscribe(params => {
      this.equipmentService.update(params.id, equipment).subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        }, '设备更新成功');
      }, (response: HttpErrorResponse) => {
        this.commonService.error(() => {
        }, response.error.message);
      });
    });
  }

  bindEuqipment(theDepartment: Department): void {
    this.department = theDepartment;
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
