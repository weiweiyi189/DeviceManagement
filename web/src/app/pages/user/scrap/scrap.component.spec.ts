import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapComponent } from './scrap.component';

describe('RepairComponent', () => {
  let component: ScrapComponent;
  let fixture: ComponentFixture<ScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
