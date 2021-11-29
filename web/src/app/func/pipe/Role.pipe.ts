import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return `管理员`;
        break;
      case 1:
        return `员工`;
        break;
      case 2:
        return `维修人员`;
        break;
      case 3:
        return `部门主管`;
        break;
    }
  }
}
