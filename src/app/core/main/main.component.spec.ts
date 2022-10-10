import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {StocksService} from "../services/stocks.service";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {By} from "@angular/platform-browser";
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

@Component({
  selector: 'app-add-stock',
  template: 'Mock add stock'
})
class MockAddStock {
  @Output()
  add = new EventEmitter<string>();
}

@Component({
  selector: 'app-list-stocks',
  template: 'Mock list stock'
})
class MockListStock {
  @Input()
  trackedStocks: string[] = [];
  @Output()
  untrack = new EventEmitter<number>();
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let stocksServiceSpy: SpyObj<StocksService>;

  beforeEach(async () => {
    stocksServiceSpy = createSpyObj(StocksService, ['loadTrackedStocks', 'saveTrackedStocks']);
    await TestBed.configureTestingModule({
      declarations: [MainComponent, MockAddStock, MockListStock],
      providers: [{provide: StocksService, useValue: stocksServiceSpy}]
    })
      .compileComponents();

    stocksServiceSpy.loadTrackedStocks.and.returnValue(['AAPL']);
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.trackedStocks).toEqual(['AAPL']);
    const listDe = fixture.debugElement.query(By.directive(MockListStock));
    expect(listDe.componentInstance.trackedStocks).toEqual(['AAPL']);
  });

  it('should add stock', () => {
    const addDe = fixture.debugElement.query(By.directive(MockAddStock));
    addDe.componentInstance.add.emit('TSLA');
    expect(component.trackedStocks).toEqual(['AAPL', 'TSLA']);
    fixture.detectChanges();
    const listDe = fixture.debugElement.query(By.directive(MockListStock));
    expect(listDe.componentInstance.trackedStocks).toEqual(['AAPL', 'TSLA']);
    expect(stocksServiceSpy.saveTrackedStocks).toHaveBeenCalledOnceWith(['AAPL', 'TSLA']);
  });

  it('should remove stock', () => {
    const listDe = fixture.debugElement.query(By.directive(MockListStock));
    listDe.componentInstance.untrack.emit(0);
    fixture.detectChanges();
    expect(component.trackedStocks).toEqual([]);
    expect(listDe.componentInstance.trackedStocks).toEqual([]);
    expect(stocksServiceSpy.saveTrackedStocks).toHaveBeenCalledOnceWith([]);
  });
});
