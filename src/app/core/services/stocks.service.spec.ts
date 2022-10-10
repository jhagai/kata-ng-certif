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
});
