export interface FinnhubSearchModel {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string
}

export interface SymbolSearchResult {
  count: number;
  result: FinnhubSearchModel[];
}


