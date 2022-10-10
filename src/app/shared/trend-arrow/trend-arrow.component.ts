import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

const enum Trend {
  UP, DOWN, STALE
}

@Component({
  selector: 'app-trend-arrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trend-arrow.component.html',
  styleUrls: ['./trend-arrow.component.scss']
})
export class TrendArrowComponent {

  readonly TREND_UP = Trend.UP;
  readonly TREND_DOWN = Trend.DOWN;

  private _trend: Trend = Trend.STALE;

  get trend(): Trend {
    return this._trend;
  }

  @Input()
  set value(value: number) {
    this._trend = value > 0 ? Trend.UP : value < 0 ? Trend.DOWN : Trend.STALE;
  }
}
