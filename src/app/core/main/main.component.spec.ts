import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {StocksService} from "../services/stocks.service";
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let stocksServiceSpy: SpyObj<StocksService>;

  beforeEach(async () => {
    stocksServiceSpy = createSpyObj(StocksService, ['loadTrackedStocks', 'saveTrackedStocks']);
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [{provide: StocksService, useValue: stocksServiceSpy}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
