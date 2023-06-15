import { orderPostApi } from '../api/orderPostApi';
import { DELETE_ALL_CONSTRUCTOR_INGREDIENTS } from './constructor-ingredients';


export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_ERROR';


export const orderPost = (idArr) => {
  return function(dispatch) {
  dispatch({
    type: POST_ORDER_REQUEST,
  })
  orderPostApi(idArr)
    .then(res => {
      if(res) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          number: res.order.number,
          name: res.name
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