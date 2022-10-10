import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncViewStateSuccess} from "../../models/async-stock-quote.model";
import {StockQuote} from "../../models/stock-quote.model";
import {Quote} from "../../models/quote.model";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

  private _data: AsyncViewStateSuccess | null = null;

  @Input()
  set data(data: AsyncViewStateSuccess) {
    this._data = data;
  }

  @Output()
  untrack = new EventEmitter<void>();

  get data(): AsyncViewStateSuccess {
    if (!this._data) {
      throw new Error('Data is mandatory');
    }
    return this._data;
  }

  get removeBtnId(): string {
    return this.data.removeBtnId;
  }

  get sentimentBtnId(): string {
    return this.data.sentimentBtnId;
  }

  get link(): string[] {
    return this.data.link;
  }

  get stockQuote(): StockQuote {
    return this.data.stockQuote;
  }

  get quote(): Quote {
    return this.stockQuote.quote;
  }
}
