import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockQuoteComponent } from './stock-quote.component';

describe('StockSummaryComponent', () => {
  let component: StockQuoteComponent;
  let fixture: ComponentFixture<StockQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockQuoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
