export const WS_AUTH_CONNECTION_START = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_SUCCESS = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR = 'WS_AUTH_CONNECTION_ERROR';
export const WS_AUTH_CONNECTION_CLOSED = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_GET_ORDERS_AUTH = 'WS_GET_ORDERS_AUTH';


export const wsConnectionStartAuth = () => {
  return {
    type: WS_AUTH_CONNECTION_START
  };
};

export const wsConnectionSuccessAuth = () => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS
  };
};

export const wsConnectionErrorAuth = () => {
  return {
    type: WS_AUTH_CONNECTION_ERROR
  };
};

export const wsConnectionClosedAuth = () => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED
  };
};

export const wsGetOrdersAuth = ordersDataAuth => {
  return {
    type: WS_GET_ORDERS_AUTH,
    payload: ordersDataAuth
  };
};