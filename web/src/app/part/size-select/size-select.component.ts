import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-size-select',
  templateUrl: './size-select.component.html',
  styleUrls: ['./size-select.component.sass']
})
export class SizeSelectComponent implements OnInit {
  @Input() size: number;

  @Output() changeSize = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  sizeChange(size: number): void {
    this.changeSize.emit(size);
  }
}
