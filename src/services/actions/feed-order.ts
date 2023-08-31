import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  POPUP_ADD_ORDER,
  POPUP_DELETE_ORDER
} from '../action-types/feed-order-types';
import { TOrder } from '../types/data';

export interface IGetOrdersRequest {
  readonly type: typeof GET_ORDERS_REQUEST;
}

export interface IGetOrdersSuccess {
  readonly type: typeof GET_ORDERS_SUCCESS;
}

export interface IGetOrdersFailed {
  readonly type: typeof GET_ORDERS_FAILED;
}

export interface IPopupAddOrder {
  readonly type: typeof POPUP_ADD_ORDER;
  payload: TOrder
}

export interface IPopupDeleteOrder {
  readonly type: typeof POPUP_DELETE_ORDER;
}

export type TFeedOrderActions =
  | IGetOrdersRequest
  | IGetOrdersSuccess
  | IGetOrdersFailed
  | IPopupAddOrder
  | IPopupDeleteOrder;

export const popupAddOrder = (res: TOrder): IPopupAddOrder => ({
  type: POPUP_ADD_ORDER,
  payload: res,
});

export const popupDeleteOrder = (): IPopupDeleteOrder => ({
  type: POPUP_DELETE_ORDER,
});
