import {TestBed} from '@angular/core/testing';

import {FinnhubInterceptor} from './finnhub-interceptor.service';
import {FINNHUB_BASE_URL} from "../../shared/providers/finnhub-base-url.injection-token";
import {FINN_HUB_TOKEN} from "../../shared/providers/finnhub-token.injection-token";

describe('FinnhubInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FinnhubInterceptor,
      {provide: FINNHUB_BASE_URL, useValue: 'baseURL'},
      {provide: FINN_HUB_TOKEN, useValue: 'token'}
    ]
  }));

  it('should be created', () => {
    const interceptor: FinnhubInterceptor = TestBed.inject(FinnhubInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
