import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeSelectComponent } from './size-select.component';
import {FormsModule} from '@angular/forms';

describe('SizeSelectComponent', () => {
  let component: SizeSelectComponent;
  let fixture: ComponentFixture<SizeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeSelectComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
