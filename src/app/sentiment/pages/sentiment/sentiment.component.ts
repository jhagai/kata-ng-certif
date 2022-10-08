import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {SentimentModel} from "../../../core/models/sentiment.model";

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent {

  symbol$: Observable<string>;
  sentiment$: Observable<SentimentModel[]>;

  constructor(activatedRoute: ActivatedRoute) {
    this.sentiment$ = activatedRoute.data.pipe(
      map(data => data['sentiment'])
    );

    this.symbol$ = activatedRoute.paramMap.pipe(map(paramMap => paramMap.get('symbol') ?? ''));
  }

  trackByFn(_: number, sentiment: SentimentModel): Date {
    return sentiment.date;
  }
}
