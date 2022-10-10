import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import {SuccessComponent} from './success.component';
import {AsyncEnum} from "../../models/async-stock-quote.model";
import {By} from "@angular/platform-browser";
import {Component, DebugElement, Input} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trend-arrow',
  template: 'Mock tend arrow'
})
class MockTrendArrow {
  @Input()
  value: number = 0;
}

@Component({
  selector: 'app-fake-sentiment',
  template: 'Fake'
})
class FakeSentiment {
}

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessComponent, MockTrendArrow],
      imports: [RouterTestingModule.withRoutes([{path: 'sentiment/:symbol', component: FakeSentiment}])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    component.data = {
      status: AsyncEnum.SUCCESS,
      symbol: 'AAPL',
      removeBtnId: 'removeAAPL',
      sentimentBtnId: 'sentimentAAPL',
      link: ['sentiment', 'AAPL'],
      stockQuote: {
        companyName: 'APPLE',
        symbol: 'AAPL',
        quote: {
          currentPrice: 1,
          percentChange: 2,
          highPriceOfTheDay: 3,
          openingPrinceOfTheDay: 4,
          previousClosePrice: 5
        }
      }
    }
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  function findElements(): { removeBtn: DebugElement, sentimentBtn: DebugElement } {
    const removeBtn = fixture.debugElement.query(By.css('#removeAAPL'));
    const sentimentBtn = fixture.debugElement.query(By.css('#sentimentAAPL'));
    return {removeBtn, sentimentBtn};
  }

  it('should create', () => {
    expect(component).toBeTruthy();
    const {removeBtn, sentimentBtn} = findElements();
    expect(removeBtn).toBeTruthy();
    expect(sentimentBtn).toBeTruthy();
  });

  it('should navigate to sentiment page when click link', fakeAsync(() => {
    const {sentimentBtn} = findElements();
    sentimentBtn.nativeElement.click();
    flush();
    expect(router.url).toBe(`/sentiment/AAPL`);
  }));

  it('should emit untrack event', () => {
    const {removeBtn} = findElements();
    const untrackSpy = spyOn(component.untrack, 'emit').and.callThrough();
    removeBtn.nativeElement.click();
    expect(untrackSpy).toHaveBeenCalled();
  });
});
