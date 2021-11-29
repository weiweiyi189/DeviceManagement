import { Component, OnDestroy, OnInit } from '@angular/core';
import {CommonService} from "../../service/common.service";
import {TitleService} from "../../service/title.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  title: string;
  show: boolean;

  private titleSubscription: Subscription;
  private backSubscription: Subscription;

  constructor(private commonService: CommonService,
              private titleService: TitleService) {
  }

  ngOnInit(): void {
    /** 订阅标题 */
    this.titleSubscription = this.titleService.title()
      .subscribe((title: string) => this.title = title);
    /** 订阅是否允许返回 */
    this.backSubscription = this.commonService.canBack()
      .subscribe((canBack: boolean) => this.show = canBack);
  }

  back(): void {
    this.commonService.back();
  }

  ngOnDestroy(): void {
    /** 统一取消订阅 */
    this.titleSubscription.unsubscribe();
    this.backSubscription.unsubscribe();
  }

}

