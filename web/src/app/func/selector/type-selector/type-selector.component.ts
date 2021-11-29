import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../Department';
import {DepartmentService} from '../../../service/department.service';
import {Type} from '../../Type';
import {TypeService} from '../../../service/type.service';

@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.sass']
})
export class TypeSelectorComponent implements OnInit {
  public state = {} as {
    type: Type,
    departments: Array<Type>
  };


  @Input()
  set goods(value: Type){
    this.state.type = value;
  }


  get goods(): Type {
    return this.state.type;
  }

  @Output()
  goodsSelect: EventEmitter<Type> = new EventEmitter();

  constructor(private typeService: TypeService) {
  }

  ngOnInit(): void {
    this.state.type = null;
    this.getAllGoodsType();
  }

  public getAllGoodsType(): void {
    this.typeService.findAll().subscribe((departments: Array<Type>) => {
      this.state.departments = departments;
    });
  }

  public change(goodsType: Type): void {
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


