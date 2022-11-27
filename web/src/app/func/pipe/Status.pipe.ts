import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return `正常`;
      case 1:
        return `借出`;
      case 2:
        return `维修中`;
      case 3:
        return `报废`;
      case 4:
        return `购入待上报`;
      case 5:
        return `购入待审批`;
      case 6:
        return `借用待审批`;
      case 7:
        return `维修待审批`;
      case 8:
        return `报废待审批`;
    }
  }
}
