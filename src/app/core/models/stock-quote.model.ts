import {Quote} from "./quote.model";

export interface StockQuote {
  companyName: string;
  symbol: string;
  quote: Quote;
}
