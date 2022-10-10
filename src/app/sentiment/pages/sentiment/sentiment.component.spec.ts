import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {SentimentComponent} from './sentiment.component';
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {SentimentModel} from "../../../core/models/sentiment.model";
import {Component, Input} from "@angular/core";
import {FinnhubSearchModel} from "../../../core/models/finnhub/finnhub-search.model";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'app-trend-arrow',
  template: 'Fake trend arrow'
})
class FakeTrendArrow {
  @Input()
  value: number = 0;
}

describe('SentimentComponent', () => {
  let component: SentimentComponent;
  let fixture: ComponentFixture<SentimentComponent>;
  let router: Router;


  beforeEach(async () => {

    const sentiments: SentimentModel[] = [
      {date: new Date('2022-08-01'), change: 1, mspr: 10},
      {date: new Date('2022-09-01'), change: 2, mspr: 20},
      {date: new Date('2022-10-01'), change: 3, mspr: 30}
    ];
    const stock: FinnhubSearchModel = {
      description: "APPLE INC",
      displaySymbol: "AAPL",
      symbol: "AAPL",
      type: "Common Stock"
    };

    const activatedRoute: Partial<ActivatedRoute> = {
      data: of({sentiment: sentiments, stock})
    };

    await TestBed.configureTestingModule({
      declarations: [SentimentComponent, FakeTrendArrow],
      imports: [RouterTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SentimentComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have a backBtn', () => {
    const routerLinkDe = fixture.debugElement.query(By.css('#backBtn'));
    expect(routerLinkDe).toBeTruthy();
    routerLinkDe.nativeElement.click();
    expect(router.url).toBe('/');
  });
});
