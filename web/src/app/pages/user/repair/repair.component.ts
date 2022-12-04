import { Component, OnInit } from '@angular/core';
import {Equipment} from '../../../func/Equipment';
import {User} from '../../../func/User';
import {EquipmentService} from '../../../service/equipment.service';
import {CommonService} from '../../../service/common.service';
import {AuthService} from '../../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.sass']
})
export class RepairComponent implements OnInit {
  /**
   * 分页信息
   */
  public params = {
    page: 0,
    size: 10,
  };

  /* 分页数据 */
  equipments = {
    totalPages: 0,
    content: new Array<Equipment>()
  };
  currentUser: User;
  constructor(private equipmentService: EquipmentService,
              private commonService: CommonService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentLoginUser$()
      .subscribe((user: User) => {
        this.currentUser = user;
        console.log(user);
      });
    this.pageAll();
  }


  public pageAll(): void {
    this.equipmentService.getToRepair(this.params.page,
      this.params.size)
      .subscribe((response: { totalPages: number, content: Array<Equipment> }) => {
        this.equipments = response;
        console.log(this.equipments);
        console.log(this.currentUser);
      });
  }

  delete(equipment: Equipment): void {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.equipmentService.delete(equipment.id).subscribe(() => {
          this.commonService.success(() => {
          }, '删除成功');
          this.pageAll();
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '即将删除设备');
  }

  report(equipment: Equipment): void {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.equipmentService.report(equipment.id, equipment).subscribe(() => {
          this.commonService.success(() => {
          }, '报修成功');
          this.pageAll();
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '是否确认报修');
  }

  repair(equipment: Equipment): void {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.equipmentService.toRepair(equipment.id, equipment).subscribe(() => {
          this.commonService.success(() => {
          }, '维修成功');
          this.pageAll();
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '是否维修完成');
  }

  scrap(equipment: Equipment): void {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.equipmentService.scrap(equipment.id, equipment).subscribe(() => {
          this.commonService.success(() => {
          }, '报废成功');
          this.pageAll();
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '是否报废设备');
  }
}
