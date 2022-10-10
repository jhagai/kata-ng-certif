import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendArrowComponent } from './trend-arrow.component';

describe('TrendArrowComponent', () => {
  let component: TrendArrowComponent;
  let fixture: ComponentFixture<TrendArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TrendArrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
