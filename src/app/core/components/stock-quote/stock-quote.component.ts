import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StocksService} from "../../services/stocks.service";
import {EMPTY, map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {
  AsyncEnum,
  AsyncViewState,
  AsyncViewStateFailure,
  AsyncViewStatePending,
  AsyncViewStateSuccess,
  isAsyncViewStateFailure,
  isAsyncViewStatePending,
  isAsyncViewStateSuccess
} from "../../models/async-stock-quote.model";

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.scss']
})
export class StockQuoteComponent {

  viewState$: Observable<AsyncViewState> = EMPTY;

  @Input()
  set symbol(symbol: string) {

    const removeBtnId = `remove${symbol}`;
    const sentimentBtnId = `sentiment${symbol}`;

    const pending: AsyncViewStatePending = {
      status: AsyncEnum.PENDING,
      symbol,
      removeBtnId,
      sentimentBtnId
    };

    this.viewState$ = this.stocksService.loadStock(symbol)
      .pipe(
        map(stockQuote => {
            return {
              status: AsyncEnum.SUCCESS,
              symbol,
              removeBtnId,
              sentimentBtnId,
              link: ['sentiment', symbol],
              stockQuote
            };
          }
        ),
        startWith(pending),
        catchError(() => {
          const failure: AsyncViewStateFailure = {
            status: AsyncEnum.FAILURE,
            symbol,
            removeBtnId,
            sentimentBtnId,
          };
          return of(failure);
        }),
      );
  }

  isSuccess(asyncViewState: AsyncViewState): AsyncViewStateSuccess | null {
    if (isAsyncViewStateSuccess(asyncViewState)) {
      return asyncViewState;
    } else {
      return null;
    }
  }

  isFailure(asyncViewState: AsyncViewState): AsyncViewStateFailure | null {
    if (isAsyncViewStateFailure(asyncViewState)) {
      return asyncViewState;
    } else {
      return null;
    }
  }

  isPending(asyncViewState: AsyncViewState): AsyncViewStatePending | null {
    if (isAsyncViewStatePending(asyncViewState)) {
      return asyncViewState;
    } else {
      return null;
    }
  }

  @Output()
  untrack = new EventEmitter<void>();

  constructor(private stocksService: StocksService) {
  }

  untrackStock() {
    this.untrack.emit();
  }
}
