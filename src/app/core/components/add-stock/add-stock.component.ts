import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

const STOCK_SYMBOL_FIELD = "stockSymbol"

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent {

  readonly STOCK_SYMBOL_FIELD = STOCK_SYMBOL_FIELD;

  @Output()
  readonly add = new EventEmitter<string>();

  trackStock(form: NgForm) {
    const {[STOCK_SYMBOL_FIELD]: stockSymbol} = form.value;
    this.add.emit(stockSymbol);
    form.setValue({[STOCK_SYMBOL_FIELD]: ''});
  }

}
