import {Component} from '@angular/core';
import {StocksService} from "../services/stocks.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  trackedStocks: string[];

  constructor(private stocksService: StocksService) {
    this.trackedStocks = stocksService.loadTrackedStocks();
  }

  trackStock($event: string) {
    this.trackedStocks = [...this.trackedStocks, $event];
    this.stocksService.saveTrackedStocks(this.trackedStocks);
  }

  remove($event: number) {
    this.trackedStocks = this.trackedStocks.filter((_, index) => index !== $event);
    this.stocksService.saveTrackedStocks(this.trackedStocks);
  }
}
