import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
} from '../action-types/order-types'
import { TOrderActions } from '../actions/order';
import { TIngredient, TOwner } from '../types/data';

export type TOrderReducerInitialState = {
  order?: {
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
      _id: string;
    },
    success: boolean;
  },
  orderPostRequest: boolean,
  orderPostFailed: boolean,
}

const initialState: TOrderReducerInitialState = {
  order: undefined,
  orderPostRequest: false,
  orderPostFailed: false,
}

export const orderReducer = (
  state = initialState,
  action: TOrderActions
  ) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderPostRequest: true,
        orderPostFailed: false,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderPostRequest: false,
        order: action.payload,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...initialState,
        orderPostFailed: true,
      };
    }
    default: {
      return state;
    }
  }
}