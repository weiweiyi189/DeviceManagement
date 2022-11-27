import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'applyStatus'
})
export class ApplyStatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return `转借`;
      case 2:
        return `维修`;
      case 3:
        return `报废`;
      case 4:
        return `购入`;
      case 5:
        return `上报购入`;

      // case 1:
      //   return `转借`;
      //   break;
      //   case 0:
      //   return `转借`;
      //   break;
      // case 2:
      //   return `转借`;
      //   break;
      // case 3:
      //   return `转借`;
      //   break;
      // case 11:
      //   return `维修`;
      //   break;
      // case 10:
      //   return `维修`;
      //   break;
      // case 12:
      //   return `维修`;
      //   break;
      // case 16:
      //   return `报废`;
      //   break;
      //   case 20:
      //   return `购入`;
      //   break;
      //   case 21:
      //   return `购入`;
      //   break;
      //   case 22:
      //   return `购入`;
      //   break;
      //   case 23:
      //   return `购入`;
      //   break;
      // case 15:
      //   return `报废`;
      //   break;
      // case 17:
      //   return `报废`;
      //   break;
      //   break;
    }
  }
}
