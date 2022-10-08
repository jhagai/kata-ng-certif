import { TestBed } from '@angular/core/testing';

import { FinnhubInterceptor } from './finnhub-interceptor.service';

describe('FinnhubInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FinnhubInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FinnhubInterceptor = TestBed.inject(FinnhubInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
