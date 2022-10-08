import {AsyncProcess} from "../../shared/models/async-process.model";
import {StockQuote} from "./stock-quote.model";

export interface Action<P> {
  type: string;
  payload: P;
}

interface ActionCreator<P> {
  create(payload: P): Action<P>;

  type: string;
}

function createAction<P>(type: string): ActionCreator<P> {
  return {
    create: function (payload: P) {
      return ({type, payload})
    },
    type
  };
}

export const trackStockAction = createAction<string>('[STOCKS] Track stock');
export const trackStockAsyncAction = createAction<AsyncProcess<string, StockQuote>>('[STOCKS] Track stock async');
export const untrackStockAction = createAction<string>('[STOCKS] Untrack stock');
export const fetchStockAction = createAction<string>('[STOCKS] Fetch stock');

interface Reducer<P, State> {
  (state: State, action: Action<P>): State;
}

function on<P, State>(actionCreator: ActionCreator<P>, reducer: Reducer<P, State>) {
  return {type: actionCreator.type, reducer};
}


function createReducer<State>(...ons: ReturnType<typeof on<any, State>>[]) {

  const map = new Map<string, Reducer<unknown, State>>();

  ons.forEach(on => {
    map.set(on.type, on.reducer);
  });

  return (state: State, action: Action<unknown>) => {
    let reducer = map.get(action.type);
    let newState = state;
    if (reducer) {
      newState = reducer(newState, action);
    }
    return newState;
  }
}

export const stocksReducer = createReducer(
  on(trackStockAction, (state: string[], {payload}) => {
    return [...state, payload];
  }),
  on(untrackStockAction, (state: string[], {payload}) => {
    return state.filter(s => s !== payload);
  }),
);

export const stocksReducer2 = createReducer(
  on(trackStockAsyncAction, (state: AsyncProcess<string, StockQuote>[], {payload}) => {
    return [...state, payload];
  }),
  on(untrackStockAction, (state: AsyncProcess<string, StockQuote>[], {payload}) => {
    return state.filter(s => s.request !== payload);
  }),
);







