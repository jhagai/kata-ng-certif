import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {FINNHUB_BASE_URL} from "./shared/providers/finnhub-base-url.injection-token";
import {FINN_HUB_TOKEN} from "./shared/providers/finnhub-token.injection-token";

const BASE_URL = 'https://finnhub.io/api/v1';
const TOKEN_VALUE = 'bu4f8kn48v6uehqi3cqg';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {provide: FINNHUB_BASE_URL, useValue: BASE_URL},
    {provide: FINN_HUB_TOKEN, useValue: TOKEN_VALUE}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
