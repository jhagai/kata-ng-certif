import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddStockComponent} from './components/add-stock/add-stock.component';
import {FormsModule} from "@angular/forms";
import {ListStocksComponent} from './components/list-stocks/list-stocks.component';
import {StockQuoteComponent} from "./components/stock-quote/stock-quote.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FinnhubInterceptor} from "./interceptors/finnhub-interceptor.service";
import {MainComponent} from './main/main.component';
import {RouterModule} from "@angular/router";
import {TrendArrowComponent} from "../shared/trend-arrow/trend-arrow.component";
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    AddStockComponent,
    ListStocksComponent,
    StockQuoteComponent,
    MainComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    TrendArrowComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: FinnhubInterceptor, multi: true},],
  exports: [
    MainComponent
  ]
})
export class CoreModule {
}
