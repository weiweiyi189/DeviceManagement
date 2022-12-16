import {Component, OnInit} from '@angular/core';
import {Equipment} from '../../../func/Equipment';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../../func/User';
import {EquipmentService} from '../../../service/equipment.service';
import {CommonService} from '../../../service/common.service';
import {AuthService} from '../../../service/auth.service';
import {Type} from '../../../func/Type';
import {config} from '../../../conf/app.conf';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  /**
   * 分页信息
   */
  public params = {
    page: 0,
    size: 10,
  };

  scoreFormControl = new FormControl(null, Validators.required);

  showModel = false;

  /* 分页数据 */
  equipments = {
    totalPages: 0,
    content: new Array<Equipment>()
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
              private commonService: CommonService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentLoginUser$()
      .subscribe((user: User) => {
        this.currentUser = user;
        console.log(user);
      });
    this.pageAll();
  }


  public pageAll(): void {
    this.equipmentService.getAllByBorrow(this.params.page,
      this.params.size)
      .subscribe((response: { totalPages: number, content: Array<Equipment> }) => {
        this.equipments = response;
        console.log(this.equipments);
      });
  }

  getFontColor(status: number): any {
    if (status === 0) {
      this.fontColor = '#2e5fee';
    } else if (status === 1) {
      this.fontColor = '#37be2e';
    } else if (status === 2) {
      this.fontColor = '#ac3d09';
    } else if (status === 3) {
      this.fontColor = '#df2e2e';
    } else if (status === 4) {
      this.fontColor = '#fe9d2e';
    } else if (status === 5) {
      this.fontColor = '#fe9d2e';
    } else if (status === 6) {
      this.fontColor = '#fe9d2e';
    }
    return this.fontColor;
  }

  bindType(thType: Type): void {
    if (thType && thType.id) {
      // 合法，设置 college
      this.queryParams.type = thType.id;
    } else {
      this.queryParams.type = null;
    }
  }

  /**
   * 单选框被用户点击时
   * @param $event 弹射值
   * @param reviewed 评阅状态码1默认2已评阅3未评阅
   */
  onCheckBoxChange($event: Event, reviewed: number): void {
    switch (reviewed) {
      case 0:
        this.queryParams.states = 0;
        break;
      case 1:
        this.queryParams.states = 1;
        break;
      case 2:
        this.queryParams.states = 2;
        break;
      case 3:
        this.queryParams.states = 3;
        break;
      case 4:
        this.queryParams.states = null;
        break;
    }
    this.loadData();
  }

  onQuery(): void {
    this.loadData();
  }

  clear(): void {
    this.queryParams.name = new FormControl();
    this.queryParams.internalNumber = new FormControl();
    this.queryParams.place = new FormControl();
    this.queryParams.type = null;
    this.loadData();
  }

  /**
   * 加载数据
   */
  loadData(): void {
    const queryParams = {
      page: this.params.page,
      size: this.params.size,
      name: this.queryParams.name.value,
      internalNumber: this.queryParams.internalNumber.value,
      type: this.queryParams.type,
      place: this.queryParams.place.value,
      states: this.queryParams.states
    };
    console.log(queryParams);
    this.equipmentService.query(queryParams)
      .subscribe((response: { totalPages: number, content: Array<Equipment> }) => {
        this.equipments = response;
        // this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
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

  open():void {
    this.showModel = true;
  }


  return(equipment: Equipment): void {
    // 确认框
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        equipment.score = this.scoreFormControl.value;
        this.equipmentService.return(equipment.id, equipment).subscribe(() => {
          this.commonService.success(() => {
          }, '归还成功');
          this.pageAll();
          this.showModel = false;
        }, (response: HttpErrorResponse) => {
          this.commonService.httpError(response);
        });
      }
    }, '是否确认归还');
  }

  onClose(): void {
    this.showModel = false;
  }
}
