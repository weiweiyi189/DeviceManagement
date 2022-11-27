import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'resultStatus'
})
export class ResultStatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return `同意`;
      case 0:
        return `未审批`;
      case 2:
        return `拒绝`;
      // case 3:
      //   return `拒绝`;
      //   break;
      // case 11:
      //   return `同意`;
      //   break;
      // case 10:
      //   return `未审批`;
      //   break;
      // case 12:
      //   return `拒绝`;
      //   break;
      // case 16:
      //   return `同意`;
      //   break;
      // case 15:
      //   return `未审批`;
      //   break;
      // case 17:
      //   return `拒绝`;
      //   break;
    }
  }
}
