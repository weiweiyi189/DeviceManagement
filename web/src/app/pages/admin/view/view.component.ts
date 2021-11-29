import { Component, OnInit } from '@angular/core';
import {EquipmentService} from '../../../service/equipment.service';
import {Equipment} from '../../../func/Equipment';
import {Type} from '../../../func/Type';
import {HttpErrorResponse} from '@angular/common/http';
import {CommonService} from '../../../service/common.service';
import {AuthService} from '../../../service/auth.service';
import {User} from '../../../func/User';
import {FormControl} from '@angular/forms';
import {config} from '../../../conf/app.conf';
import {ApprovalService} from '../../../service/approval.service';
import {Approval} from '../../../func/approval';

@Component({
  selector: 'app-equipment',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  /**
   * 分页信息
   */
  public params = {
    page: 0,
    size: 10,
  };

  /* 分页数据 */
  approvals = {
    totalPages: 0,
    content: new Array<Approval>()
  };

  /* 查询参数 */
  queryParams = {
    page: 0,
    states: undefined,
    size: this.params.size,
    name: new FormControl(),
    internalNumber: new FormControl(),
    place: new FormControl(),
    type: null
  };

  currentUser: User;
  fontColor: any;
  constructor(private equipmentService: EquipmentService,
              private approvalService: ApprovalService,
              private commonService: CommonService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.page();
  }

  page(): void {
    this.approvalService.allPage(this.params.page,
      this.params.size).subscribe((response: { totalPages: number, content: Array<Approval> }) => {
      this.approvals = response;
      // this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
    });
  }

  getFontColor(status: number): any {
    if (status === 11 || status === 1 || status === 16 || status === 21) {
      this.fontColor = '#37be2e';
    }
    else if (status === 0 || status === 10 || status === 15 || status === 20) {
      this.fontColor = '#ac3d09';
    }
    else if (status === 2 || status === 17 || status === 12 || status === 22 || status === 23) {
      this.fontColor = '#df2e2e';
    }
    return this.fontColor;
  }

  pass(id: number): void {
    console.log(id);
    this.commonService.confirm((confirm) => {
      if (confirm) {
        console.log(id);
        this.approvalService.pass(id)
          .subscribe(() => {
            this.commonService.success();
            this.page();
          });
      }
    });
  }

  fail(id: number): void {
    this.commonService.confirm((confirm) => {
      if (confirm) {
        this.approvalService.fail(id)
          .subscribe(() => {
            this.commonService.success();
            this.page();
          });
      }
    });
  }
}
