import {TestBed} from '@angular/core/testing';

import {StocksService} from './stocks.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('StocksService', () => {
  let service: StocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(StocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveTrackedStocks', () => {
    it('should serialize and save in localStorage', () => {
      const setItemSpy = spyOn(localStorage, 'setItem').and.stub();
      service.saveTrackedStocks(['AAPL']);
      expect(setItemSpy).toHaveBeenCalledOnceWith(StocksService.TRACKED_STOCKS_KEY, '["AAPL"]');
    });
  });

  describe('loadTrackedStocks', () => {
    it('should parse stocks from localStorage successfully', () => {
      spyOn(localStorage, 'getItem').and.returnValue('["AAPL"]');
      const stocks = service.loadTrackedStocks();
      expect(stocks).toEqual(['AAPL']);
    });

    it('should ignore array parsing errors', () => {
      spyOn(localStorage, 'getItem').and.returnValue('["AAPL]');
      const stocks = service.loadTrackedStocks();
      expect(stocks).toEqual([]);
    });

    it('should ignore item parsing errors', () => {
      spyOn(localStorage, 'getItem').and.returnValue('["AAPL", ["TSLA"]]');
      const stocks = service.loadTrackedStocks();
      expect(stocks).toEqual([]);
    });

  })

});
