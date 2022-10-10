import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FINN_HUB_TOKEN} from 'src/app/shared/providers/finnhub-token.injection-token';
import {FINNHUB_BASE_URL} from "../../shared/providers/finnhub-base-url.injection-token";
import {FINN_HUB_TOKEN_KEY} from "../../shared/providers/finnhub-token-key.injection-token";

@Injectable()
export class FinnhubInterceptor implements HttpInterceptor {

  constructor(
    @Inject(FINNHUB_BASE_URL) private finnhubBaseUrl: string,
    @Inject(FINN_HUB_TOKEN) private finnhubToken: string,
    @Inject(FINN_HUB_TOKEN_KEY) private finnhubTokenKey: string
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const params = (request.params ?? new HttpParams())
      .set(this.finnhubTokenKey, this.finnhubToken);
    const fullUrl = `${this.finnhubBaseUrl}/${request.url}`;
    let reqWithToken = request.clone({url: fullUrl, params});
    return next.handle(reqWithToken);
  }
}
