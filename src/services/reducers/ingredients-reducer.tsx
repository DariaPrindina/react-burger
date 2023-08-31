import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  POPUP_ADD_INGREDIENT,
  POPUP_DELETE_INGREDIENT,
} from '../action-types/ingredients-types'
import { TIngredientsActions } from '../actions/ingredients'
import { TIngredient } from '../types/data'

export type TIngredientsInitialState = {
  ingredients: TIngredient[],
  getIngredientsRequest: boolean,
  getIngredientsFailed: boolean,
  selectedIngredient?: TIngredient,
}

const initialState: TIngredientsInitialState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
  selectedIngredient: undefined,
}

export const ingredientsReducer = (
  state = initialState, 
  action: TIngredientsActions
  ) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        getIngredientsRequest: true,
        getIngredientsFailed: false,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        getIngredientsRequest: false,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        getIngredientsFailed: true,
      }
    }
    case POPUP_ADD_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.payload,
      }
    }
    case POPUP_DELETE_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: undefined,
      }
    }
    default: {
      return state
    }
  }
}