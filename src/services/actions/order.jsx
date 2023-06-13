import { useSelector } from 'react-redux';
import { orderPostApi} from '../api/orderPostApi';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_ERROR';

export const postOrderRequest = () => ({
  type: POST_ORDER_REQUEST,
})

export const postOrderSuccess = (items) => ({
  type: POST_ORDER_SUCCESS,
  payload: items,
})

export const postOrderFailed = () => ({
  type: POST_ORDER_FAILED,
})

export const orderPost = (idArr) => dispatch => {
  dispatch(postOrderRequest())
  orderPostApi(idArr)
    .then(res => {
      dispatch(postOrderSuccess(res))
    })
    .catch(() => {
      dispatch(postOrderFailed())
    })
}