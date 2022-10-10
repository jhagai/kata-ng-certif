import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {AddStockComponent} from './add-stock.component';
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('AddStockComponent', () => {
  let component: AddStockComponent;
  let fixture: ComponentFixture<AddStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStockComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  function findElements(): { stockInput: DebugElement, trackBtn: DebugElement, form: DebugElement } {
    const stockInput = fixture.debugElement.query(By.css('#stockInput'));
    const trackBtn = fixture.debugElement.query(By.css('#trackBtn'));
    const form = fixture.debugElement.query(By.css('form'));

    return {stockInput, trackBtn, form};
  };

  function inputValue(stockInput: DebugElement, value: string) {
    stockInput.nativeElement.value = value;
    stockInput.nativeElement.dispatchEvent(new Event('input'));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
    const {stockInput, trackBtn} = findElements();

    expect(stockInput).toBeTruthy();
    expect(stockInput.nativeElement.getAttribute("maxlength")).toEqual('5');
    expect(trackBtn).toBeTruthy();
  });

  it('should disable submit when input is empty.', () => {
    const {stockInput, trackBtn} = findElements();
    // WHEN
    inputValue(stockInput, '');
    fixture.detectChanges();
    // THEN
    expect(trackBtn.nativeElement.disabled).toBeTruthy();
  });

  it('should enable submit when input is NOT empty.', () => {
    const {stockInput, trackBtn} = findElements();
    // WHEN
    inputValue(stockInput, 'AAPL');
    fixture.detectChanges();
    // THEN
    expect(trackBtn.nativeElement.disabled).toBeFalsy();
  });

  it('should publish value and reset input when form is submitted.', () => {
    const {stockInput, form} = findElements();
    // WHEN
    inputValue(stockInput, 'AAPL');
    fixture.detectChanges();
    // THEN
    const addOutputSpy = spyOn(component.add, 'emit').and.callThrough();
    form.nativeElement.dispatchEvent(new Event('submit'));
    expect(addOutputSpy).toHaveBeenCalledWith('AAPL');
  });

});
