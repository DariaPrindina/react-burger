import { rootReducer } from './reducers/root-reducer';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from './action-types/ws-actions-types';
import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_ORDERS_AUTH
} from './action-types/ws-actions-auth-types'
import { TWsActionsTypes } from './types/data';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlAuth = 'wss://norma.nomoreparties.space/orders';

const wsActions: TWsActionsTypes = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS
};

const wsActionsAuth: TWsActionsTypes = {
  wsInit: WS_AUTH_CONNECTION_START,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS_AUTH
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  socketMiddleware(wsUrl, wsActions),
  socketMiddleware(wsUrlAuth, wsActionsAuth, true),
  ));

export const store = createStore(rootReducer, enhancer);