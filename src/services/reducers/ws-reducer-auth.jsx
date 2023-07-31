import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_ORDERS_AUTH
} from '../actions/ws-actions-auth'

const initialState = {
  wsConnected: false,
  ordersDataAuth: []
}

export const wsReducerAuth = (state = initialState, action) => {
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