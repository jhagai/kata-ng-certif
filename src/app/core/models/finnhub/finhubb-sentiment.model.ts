export interface FinhubbSentimentModel {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}

export interface FinnHubSentimentResponse {
  data: FinhubbSentimentModel[];
  symbol: string;
}
