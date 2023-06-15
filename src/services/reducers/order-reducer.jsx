import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
} from '../actions/order'

const initialState = {
  order: null,
  orderPostRequest: false,
  orderPostFailed: false,
  name: '',
}

export const orderReducer = (state = initialState, action) => {
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
        order: action.number,
        name: action.name,
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