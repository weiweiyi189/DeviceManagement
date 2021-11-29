import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return `正常`;
        break;
      case 1:
        return `借出`;
        break;
      case 2:
        return `维修中`;
        break;
      case 3:
        return `报废`;
        break;
      case 4:
        return `购入待上报`;
        break;
      case 5:
        return `购入待审批`;
        break;
    }
  }
}
