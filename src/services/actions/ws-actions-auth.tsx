import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_ORDERS_AUTH
} from '../action-types/ws-actions-auth-types'
import { TOrder } from '../types/data';

export interface IWsAuthConnectionStart {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}

export interface IWsAuthConnectionSuccess {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

export interface IWsAuthConnectionError {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
}

export interface IWsAuthConnectionClosed {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

export interface IWsGetOrdersAuth {
  readonly type: typeof WS_GET_ORDERS_AUTH,
  payload?: {
    orders: TOrder[],
    totalToday: number,
    total: number
  };
}

export type TWsAuthActions =
  | IWsAuthConnectionStart
  | IWsAuthConnectionSuccess
  | IWsAuthConnectionError
  | IWsAuthConnectionClosed
  | IWsGetOrdersAuth;


export const wsConnectionStartAuth = (): IWsAuthConnectionStart => {
  return {
    type: WS_AUTH_CONNECTION_START
  };
};

export const wsConnectionSuccessAuth = (): IWsAuthConnectionSuccess => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS
  };
};

export const wsConnectionErrorAuth = (): IWsAuthConnectionError => {
  return {
    type: WS_AUTH_CONNECTION_ERROR
  };
};

export const wsConnectionClosedAuth = (): IWsAuthConnectionClosed => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED
  };
};

export const wsGetOrdersAuth = (ordersDataAuth: {
  orders: TOrder[],
  totalToday: number,
  total: number
}): IWsGetOrdersAuth => {
  return {
    type: WS_GET_ORDERS_AUTH,
    payload: ordersDataAuth
  };
};