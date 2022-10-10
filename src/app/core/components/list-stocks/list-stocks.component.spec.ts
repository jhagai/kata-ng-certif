import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListStocksComponent} from './list-stocks.component';
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'app-stock-quote',
  template: 'Fake'
})
class FakeStockQuote {
  @Input()
  symbol: string = '';

  @Output()
  untrack = new EventEmitter<number>();
}

describe('ListStocksComponent', () => {
  let component: ListStocksComponent;
  let fixture: ComponentFixture<ListStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListStocksComponent, FakeStockQuote]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide symbols to children', () => {
    component.trackedStocks = ['APPL', 'TSLA', 'GOOG']
    fixture.detectChanges();
    const stocks = fixture.debugElement.queryAll(By.directive(FakeStockQuote));
    expect(stocks).toHaveSize(3);
    let actualTrackedStocks = stocks.map(s => s.componentInstance.symbol);
    expect(actualTrackedStocks).toEqual(['APPL', 'TSLA', 'GOOG']);
  });

  it('should provide symbols to children', () => {
    component.trackedStocks = ['APPL'];
    fixture.detectChanges();
    const stock = fixture.debugElement.query(By.directive(FakeStockQuote));
    const untrackSpy = spyOn(component.untrack, 'emit').and.callThrough();
    stock.componentInstance.untrack.emit(0);
    expect(untrackSpy).toHaveBeenCalledWith(0);
  });
});
