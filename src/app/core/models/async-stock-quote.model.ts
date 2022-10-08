import {StockQuote} from "./stock-quote.model";

export enum AsyncEnum {
  SUCCESS, FAILURE, PENDING
}

export interface AsyncViewStateSuccess {
  status: AsyncEnum.SUCCESS;
  symbol: string;
  removeBtnId: string;
  sentimentBtnId: string;
  link: string[];
  stockQuote: StockQuote;
}

export interface AsyncViewStatePending {
  status: AsyncEnum.PENDING;
  symbol: string;
  removeBtnId: string;
  sentimentBtnId: string;
}

export interface AsyncViewStateFailure {
  status: AsyncEnum.FAILURE;
  symbol: string;
  removeBtnId: string;
  sentimentBtnId: string;
}

export type AsyncViewState = AsyncViewStateSuccess | AsyncViewStatePending | AsyncViewStateFailure;

export function isAsyncViewStateSuccess(viewState: AsyncViewState): viewState is AsyncViewStateSuccess {
  return viewState.status === AsyncEnum.SUCCESS
}

export function isAsyncViewStateFailure(viewState: AsyncViewState): viewState is AsyncViewStateFailure {
  return viewState.status === AsyncEnum.FAILURE
}

export function isAsyncViewStatePending(viewState: AsyncViewState): viewState is AsyncViewStatePending {
  return viewState.status === AsyncEnum.PENDING
}
