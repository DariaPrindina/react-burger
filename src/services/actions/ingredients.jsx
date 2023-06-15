import { getIngredientsData } from "../api/getIngredientsData";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_REQUEST'

export const POPUP_ADD_INGREDIENT = 'POPUP_ADD_INGREDIENT'
export const POPUP_DELETE_INGREDIENT = 'POPUP_DELETE_INGREDIENT'

export const getIngredients = () => dispatch => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  })
  getIngredientsData()
  .then(res => {
    dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      payload: res.data,
    })
  })
  .catch(err => {
    dispatch({
      type: GET_INGREDIENTS_FAILED,
    })
    console.log(err)
  })
}

export const popupAddIngredient = (res) => ({
  type: POPUP_ADD_INGREDIENT,
  payload: res,
});

export const popupDeleteIngredient = () => ({
  type: POPUP_DELETE_INGREDIENT,
});
