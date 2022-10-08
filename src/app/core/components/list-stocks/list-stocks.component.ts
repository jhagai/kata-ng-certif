import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list-stocks',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list-stocks.component.scss']
})
export class ListStocksComponent {

  @Input()
  trackedStocks: string[] = [];

  @Output()
  untrack = new EventEmitter<number>();

  untrackStock(index: number): void {
    this.untrack.emit(index);
  }
}
