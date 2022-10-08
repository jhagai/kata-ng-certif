import {Injectable} from '@angular/core';
import {forkJoin, map, Observable} from "rxjs";
import {StockQuote} from "../models/stock-quote.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Quote} from "../models/quote.model";
import {RawQuote} from "../models/finnhub/finnhub-quote.model";
import {FinnhubSearchModel, SymbolSearchResult} from "../models/finnhub/finnhub-search.model";
import {FinnHubSentimentResponse} from "../models/finnhub/finhubb-sentiment.model";
import {SentimentModel} from "../models/sentiment.model";

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private static readonly TRACKED_STOCKS_KEY = 'TRACKED_STOCKS_KEY';

  constructor(private httpClient: HttpClient) {
  }

  loadStock(stockSymbol: string): Observable<StockQuote> {
    return forkJoin([this.loadStockCompany(stockSymbol), this.loadStockQuote(stockSymbol)]).pipe(
      map(
        ([{description, symbol}, quote]) => ({
          companyName: description,
          symbol,
          quote
        })
      )
    )
  }

  private loadStockQuote(stockSymbol: string): Observable<Quote> {

    const params = (new HttpParams()).set('symbol', stockSymbol);

    return this.httpClient.get<RawQuote>(`quote`, {params}).pipe(
      map(({c, dp, h, o, pc}) => ({
        currentPrice: c,
        percentChange: dp,
        highPriceOfTheDay: h,
        openingPrinceOfTheDay: o,
        previousClosePrice: pc
      }))
    );
  }

  private loadStockCompany(stockSymbol: string): Observable<FinnhubSearchModel> {
    let params = (new HttpParams()).set('q', stockSymbol);

    return this.httpClient.get<SymbolSearchResult>(`search`, {params}).pipe(
      map(({count, result}) => {
          if (!count) {
            // The stock does not exist
            throw new Error(`Cannot find company associated to symbol <${stockSymbol}>`);
          } else {
            const symbolSearchModel = result.find(({symbol}) => symbol === stockSymbol);
            if (!symbolSearchModel) {
              throw new Error(`Cannot find company associated to symbol <${stockSymbol}>`);
            }
            return symbolSearchModel;
          }
        }
      )
    );
  }

  loadSentiment(symbol: string, from: Date, to: Date): Observable<SentimentModel[]> {
    const params = (new HttpParams())
      .set('symbol', symbol)
      .set('from', formatDate(from))
      .set('to', formatDate(to));

    return this.httpClient.get<FinnHubSentimentResponse>(`stock/insider-sentiment`, {params}).pipe(
      map(
        response => response.data.map(
          sentiment => ({
            symbol: symbol,
            date: new Date(`${sentiment.year}-${padZeroes(sentiment.month)}-01`),
            change: sentiment.change,
            mspr: sentiment.mspr,
          })
        )
      )
    );
  }

  saveTrackedStocks(trackedStocks: string[]) {
    const trackedStocksStr = JSON.stringify(trackedStocks);
    localStorage.setItem(StocksService.TRACKED_STOCKS_KEY, trackedStocksStr);
  }

  /**
   * Load saved stocks symbols from local storage.
   * If local storage data cannot be derialized properly, return an empty array.
   */
  loadTrackedStocks(): string[] {
    let fromLocalStorage = localStorage.getItem(StocksService.TRACKED_STOCKS_KEY);
    let result: string[] = [];
    if (fromLocalStorage) {
      let parsed;
      try {
        parsed = JSON.parse(fromLocalStorage);
      } catch (e) {
        console.warn("Failed to load stocks, local storage seems corrupted.", fromLocalStorage);
      }
      if (Array.isArray(parsed)) {
        if (parsed.every(elt => typeof elt === 'string')) {
          result = parsed as string[];
        } else {
          console.warn("Failed to load stocks, local storage seems corrupted.", fromLocalStorage);
        }
      }
    }
    return result;
  }
}

function padZeroes(num: number): string {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date): string {
  const day = padZeroes(date.getDate());
  const month = padZeroes(date.getMonth() + 1);
  const year = padZeroes(date.getFullYear());
  return `${year}-${month}-${day}`;
}
