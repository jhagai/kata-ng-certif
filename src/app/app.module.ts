import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {FINNHUB_BASE_URL} from "./shared/providers/finnhub-base-url.injection-token";
import {FINN_HUB_TOKEN} from "./shared/providers/finnhub-token.injection-token";
import {environment} from "../environments/environment";


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
    {provide: FINNHUB_BASE_URL, useValue: environment.finnHubBaseUrl},
    {provide: FINN_HUB_TOKEN, useValue: environment.finnHubToken}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
