import { getIngredientsData } from "../api/getIngredientsData";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  POPUP_ADD_INGREDIENT,
  POPUP_DELETE_INGREDIENT
} from '../action-types/ingredients-types'
import { TIngredient } from "../types/data";
import { AppDispatch, AppThunk } from "../types";

export interface IGeIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  payload: TIngredient[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IPopupAddIngredient {
  readonly type: typeof POPUP_ADD_INGREDIENT,
  payload: TIngredient;
}

export interface IPopupDeleteIngredient {
  readonly type: typeof POPUP_DELETE_INGREDIENT;
}

export type TIngredientsActions =
  | IGeIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | IPopupAddIngredient
  | IPopupDeleteIngredient;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
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

export const popupAddIngredient = (res: TIngredient): IPopupAddIngredient => ({
  type: POPUP_ADD_INGREDIENT,
  payload: res,
});

export const popupDeleteIngredient = (): IPopupDeleteIngredient => ({
  type: POPUP_DELETE_INGREDIENT,
});
