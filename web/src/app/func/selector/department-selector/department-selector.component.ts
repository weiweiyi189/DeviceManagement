import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../Department';
import {DepartmentService} from '../../../service/department.service';

@Component({
  selector: 'app-department-selector',
  templateUrl: './department-selector.component.html',
  styleUrls: ['./department-selector.component.sass']
})
export class DepartmentSelectorComponent implements OnInit {
  public state = {} as {
    department: Department,
    departments: Array<Department>
  };


  @Input()
  set goods(value: Department){
    this.state.department = value;
  }


  get goods(): Department {
    return this.state.department;
  }

  @Output()
  goodsSelect: EventEmitter<Department> = new EventEmitter();

  constructor(private goodsService: DepartmentService) {
  }

  ngOnInit(): void {
    this.state.department = null;
    this.getAllGoodsType();
  }

  public getAllGoodsType(): void {
    this.goodsService.findAll().subscribe((departments: Array<Department>) => {
      this.state.departments = departments;
    });
  }

  public change(goodsType: Department): void {
    this.goodsSelect.emit(goodsType);
  }

  comparedWithId(item1, item2): any {
    const result1: boolean = item1 === item2;
    let result2: boolean;
    if (item1 && item2) {
      result2 = item1.id === item2.id;
    }
    return result1 || result2;
  }

}

