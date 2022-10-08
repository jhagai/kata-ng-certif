import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SentimentRoutingModule} from './sentiment-routing.module';
import {SentimentComponent} from './pages/sentiment/sentiment.component';
import {TrendArrowComponent} from "../shared/trend-arrow/trend-arrow.component";


@NgModule({
  declarations: [
    SentimentComponent
  ],
  imports: [
    CommonModule,
    SentimentRoutingModule,
    TrendArrowComponent
  ]
})
export class SentimentModule {
}
