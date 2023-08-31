import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_ORDERS_AUTH
} from '../action-types/ws-actions-auth-types'
import { TWsAuthActions } from '../actions/ws-actions-auth';
import { TOrder } from '../types/data';

export type TWsReducerAuthInitialState = {
  wsConnected: boolean,
  ordersDataAuth?: {
    orders: TOrder[],
    totalToday: number,
    total: number
  };
}

const initialState: TWsReducerAuthInitialState = {
  wsConnected: false,
  ordersDataAuth: undefined
}

export const wsReducerAuth = (
  state = initialState, 
  action: TWsAuthActions
  ) => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_ORDERS_AUTH:
      return {
        ...state,
        ordersDataAuth: action.payload
      };
    default:
      return state;
  }
};