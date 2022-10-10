import {TestBed} from '@angular/core/testing';

import {FinnhubInterceptor} from './finnhub-interceptor.service';
import {FINNHUB_BASE_URL} from "../../shared/providers/finnhub-base-url.injection-token";
import {FINN_HUB_TOKEN} from "../../shared/providers/finnhub-token.injection-token";
import {HttpHandler, HttpParams, HttpRequest} from "@angular/common/http";
import {FINN_HUB_TOKEN_KEY} from "../../shared/providers/finnhub-token-key.injection-token";
import createSpyObj = jasmine.createSpyObj;

describe('FinnhubInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FinnhubInterceptor,
      {provide: FINNHUB_BASE_URL, useValue: 'http://baseURL'},
      {provide: FINN_HUB_TOKEN, useValue: 'tokenValue'},
      {provide: FINN_HUB_TOKEN_KEY, useValue: 'tokenKey'}
    ]
  }));

  it('should be created', () => {
    const interceptor: FinnhubInterceptor = TestBed.inject(FinnhubInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should update url and add token', () => {
    // GIVEN
    const interceptor: FinnhubInterceptor = TestBed.inject(FinnhubInterceptor);
    const req = new HttpRequest('GET', 'path');
    const httpHandlerSpy = createSpyObj<HttpHandler>(['handle']);
    // WHEN
    interceptor.intercept(req, httpHandlerSpy);
    // THEN
    const expectedReq = new HttpRequest('GET', 'http://baseURL/path', {params: (new HttpParams()).set('tokenKey', 'tokenValue')});
    expect(httpHandlerSpy.handle).toHaveBeenCalledWith(expectedReq);
  });

  it('should preserve existing request params', () => {
    // GIVEN
    const interceptor: FinnhubInterceptor = TestBed.inject(FinnhubInterceptor);
    const req = new HttpRequest('GET', 'path', {params: (new HttpParams()).set('whateverKey', 'whateverValue')});
    const httpHandlerSpy = createSpyObj<HttpHandler>(['handle']);
    // WHEN
    interceptor.intercept(req, httpHandlerSpy);
    // THEN
    const expectedReq = new HttpRequest('GET', 'http://baseURL/path', {params: (new HttpParams()).set('whateverKey', 'whateverValue').set('tokenKey', 'tokenValue')});
    expect(httpHandlerSpy.handle).toHaveBeenCalledWith(expectedReq);
  });
});
