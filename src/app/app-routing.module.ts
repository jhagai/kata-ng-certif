import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./core/main/main.component";
import {StocksService} from "./core/services/stocks.service";
import {throwError} from "rxjs";

const SYMBOL = 'symbol';

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: `sentiment/:${SYMBOL}`,
    loadChildren: () => import('./sentiment/sentiment.module').then(m => m.SentimentModule),
    resolve: {
      sentiment: ({paramMap}: ActivatedRouteSnapshot) => {
        const symbol = paramMap.get(SYMBOL);
        if (!symbol) {
          return throwError(() => new Error('Symbol in route is mandatory.'));
        }
        let stocksService = inject(StocksService);
        const to = new Date();
        const from = new Date(to);
        from.setMonth(to.getMonth() - 2);
        return stocksService.loadSentiment(symbol, from, to);
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
