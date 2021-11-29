import { Component, OnInit } from '@angular/core';
import {EquipmentService} from '../../../service/equipment.service';
import {CommonService} from '../../../service/common.service';
import {AuthService} from '../../../service/auth.service';
import {User} from '../../../func/User';
import {FormControl} from '@angular/forms';
import {ApprovalService} from '../../../service/approval.service';
import {Approval} from '../../../func/approval';

@Component({
  selector: 'app-equipment',
  templateUrl: './up.component.html',
  styleUrls: ['./up.component.scss']
})
export class UpComponent implements OnInit {
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
    this.approvalService.upSalePage(this.params.page,
      this.params.size).subscribe((response: { totalPages: number, content: Array<Approval> }) => {
      this.approvals = response;
      console.log(response.content);
      // this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
    });
  }

  getFontColor(status: number): any {
    if (status === 0) {
      this.fontColor = '#2e5fee';
    }
    else if (status === 1) {
      this.fontColor = '#37be2e';
    }
    else if (status === 2) {
      this.fontColor = '#ac3d09';
    }
    else if (status === 3) {
      this.fontColor = '#df2e2e';
    }
    return this.fontColor;
  }

  pass(id: number): void {
    console.log(id);
    this.commonService.confirm((confirm) => {
      if (confirm) {
        console.log(id);
        this.approvalService.upSalePass(id)
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
        this.approvalService.upSaleFail(id)
          .subscribe(() => {
            this.commonService.success();
            this.page();
          });
      }
    });
  }
}
