import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from '../action-types/ws-actions-types'
import { TWsActions } from '../actions/ws-actions';
import { TOrder } from '../types/data';

export type TWsReducerInitialState = {
  wsConnected: boolean,
  ordersData?: {
    orders: TOrder[],
    totalToday: number,
    total: number
  }
}

const initialState: TWsReducerInitialState = {
  wsConnected: false,
  ordersData: undefined
}

export const wsReducer = (
  state = initialState, 
  action: TWsActions
  ) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        ordersData: action.payload
      };
    default:
      return state;
  }
};