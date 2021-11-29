import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {
  transform(value: boolean): string {
    switch (value) {
      case true:
        return `女`;
        break;
      default:
        return `男`;
        break;
    }
  }
}
