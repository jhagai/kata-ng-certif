import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StockQuoteComponent} from './stock-quote.component';
import {StocksService} from "../../services/stocks.service";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('StockQuoteComponent', () => {
  let component: StockQuoteComponent;
  let fixture: ComponentFixture<StockQuoteComponent>;
  let stocksServiceSpy: SpyObj<StocksService>;

  beforeEach(async () => {
    stocksServiceSpy = createSpyObj(StocksService, ['loadStock']);
    await TestBed.configureTestingModule({
      declarations: [StockQuoteComponent],
      providers: [{provide: StocksService, useValue: stocksServiceSpy}]
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
