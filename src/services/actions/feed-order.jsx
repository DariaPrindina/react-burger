import { getOrdersData } from "../api/getOrdersData";

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST'
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS'
export const GET_ORDERS_FAILED = 'GET_ORDERS_FAILED'

export const POPUP_ADD_ORDER = 'POPUP_ADD_ORDER'
export const POPUP_DELETE_ORDER = 'POPUP_ADD_ORDER'

export const getOrders = () => dispatch => {
  dispatch({
    type: GET_ORDERS_REQUEST,
  })
  getOrdersData()
  .then(res => {
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: res.data,
    })
  })
  .catch(err => {
    dispatch({
      type: GET_ORDERS_FAILED,
    })
    console.log(err)
  })
}

export const popupAddOrder = (res) => ({
  type: POPUP_ADD_ORDER,
  payload: res,
});

export const popupDeleteOrder = () => ({
  type: POPUP_DELETE_ORDER,
});
