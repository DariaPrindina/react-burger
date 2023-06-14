import { useSelector } from 'react-redux';
import { orderPostApi } from '../api/orderPostApi';
import { DELETE_ALL_CONSTRUCTOR_INGREDIENTS } from './constructor-ingredients';


export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_ERROR';


export const orderPost = (idArr) => dispatch => {
  dispatch({
    type: POST_ORDER_REQUEST,
  })
  orderPostApi(idArr)
    .then(res => {
      dispatch({
        type: POST_ORDER_SUCCESS,
        payload: res.order,
      })
      dispatch({
        type: DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
      })
    })
    .catch((err) => {
      dispatch({
        type: POST_ORDER_FAILED,
      })
      console.log(err)
    })
}