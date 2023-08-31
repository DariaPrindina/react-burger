import { orderPostApi } from '../api/orderPostApi';
import { DELETE_ALL_CONSTRUCTOR_INGREDIENTS } from '../action-types/constructor-ingredients-types';
import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED
} from '../action-types/order-types'
import { AppDispatch, AppThunk } from '../types';
import { TIngredient, TOwner } from '../types/data';

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS,
  payload: {
    success: boolean,
    name: string,
    order: {
      createdAt: string | number | Date;
      ingredients: TIngredient[];
      name: string;
      number: number;
      owner: TOwner;
      price: number;
      status: string;
      updatedAt: string;
      _id: string;}
  },
}

export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
}

export type TOrderActions =
  | IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed;

export const orderPost: AppThunk = (idArr) => {
  return function(dispatch: AppDispatch) {
  dispatch({
    type: POST_ORDER_REQUEST,
  })
  orderPostApi(idArr)
    .then(res => {
      console.log('resOrderpostapi => ', res)
      if(res) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          payload: res,
        })
      }
    })
    .then(() => {
      dispatch({
        type: DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
      })
    })
    .catch(() => {
      dispatch({
        type: POST_ORDER_FAILED,
      })
    })
}}