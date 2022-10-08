import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FINN_HUB_TOKEN} from 'src/app/shared/providers/finnhub-token.injection-token';
import {FINNHUB_BASE_URL} from "../../shared/providers/finnhub-base-url.injection-token";

const TOKEN_KEY = "token";

@Injectable()
export class FinnhubInterceptor implements HttpInterceptor {

  constructor(
    @Inject(FINNHUB_BASE_URL) private finnhubBaseUrl: string,
    @Inject(FINN_HUB_TOKEN) private finhubToken: string) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const params = (request.params ?? new HttpParams())
      .set(TOKEN_KEY, this.finhubToken);
    const fullUrl = `${this.finnhubBaseUrl}/${request.url}`;
    let reqWithToken = request.clone({url: fullUrl, params});
    return next.handle(reqWithToken);
  }
}
