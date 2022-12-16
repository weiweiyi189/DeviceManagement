import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EquipmentService} from '../../../../service/equipment.service';
import {Equipment} from "../../../../func/Equipment";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.sass']
})
export class RecommendComponent implements OnInit {

  purpose = '';

  equipments = new Array<Equipment>();

  purposeArray = new Array<string>();

  /* 查询参数 */
  queryParams = {
    page: 0,
    size: 10,
  };

  /* 分页数据 */
  pageEquipments = {
    totalPages: 0,
    content: new Array<Equipment>()
  };

  constructor(private equipmentService: EquipmentService,
              private ref: ChangeDetectorRef) {
  }

  getFontColor(status: number): any {
    return this.equipmentService.getFontColor(status);
  }

  ngOnInit(): void {

    this.equipmentService.getAll(0, 20)
      .subscribe((value) => {
        this.equipments = value;
        const purposeSet = new Set();
        value.forEach((equipment) => {
          if (equipment.purpose && !equipment.deleted) {
            purposeSet.add(equipment.purpose);
          }
        });
        this.purposeArray = Array.from(purposeSet.values()) as string[];
        this.ref.detectChanges();
        this.purposeArray.forEach((value1) => {
          console.log(value1);
        });
        console.log(this.purposeArray);
      });
  }

  change(): void {
    if (this.purpose === null) {
      this.pageEquipments = {
        totalPages: 0,
        content: new Array<Equipment>()
      };
    }
    else  {
      this.equipmentService.query({page: this.queryParams.page, size: this.queryParams.size, purpose: this.purpose})
        .subscribe((response: { totalPages: number, content: Array<Equipment> }) => {
          this.pageEquipments = response;
          this.pageEquipments.content = response.content.filter((value) => {
           return  value.states === 0;
          });
          console.log(response);
        });
    }
    }

  onPageSelected(page: number): void {
    this.queryParams.page = page;
    this.change();
  }

  onSizeSelected(size: number): void {
    this.queryParams.size = size;
    this.change();
  }

}
