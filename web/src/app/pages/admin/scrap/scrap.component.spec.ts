import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapComponent } from './scrap.component';

describe('EquipmentComponent', () => {
  let component: ScrapComponent;
  let fixture: ComponentFixture<ScrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
