import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {SentimentModel} from "../../../core/models/sentiment.model";
import {FinnhubSearchModel} from "../../../core/models/finnhub/finnhub-search.model";

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent {

  viewModel$: Observable<{ stock: FinnhubSearchModel, sentiments: SentimentModel[] }>;

  constructor(activatedRoute: ActivatedRoute) {
    this.viewModel$ = activatedRoute.data.pipe(
      map(data => ({
          stock: data['stock'],
          sentiments: data['sentiments']
        })
      )
    );
  }

  trackByFn(_: number, sentiment: SentimentModel): Date {
    return sentiment.date;
  }
}
