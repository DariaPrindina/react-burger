import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  POPUP_ADD_INGREDIENT,
  POPUP_DELETE_INGREDIENT,
} from '../actions/ingredients'

const initialState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
  selectedIngredient: null,
}

export const ingredientsReducer = (state = initialState, action) => {
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
        ...state,
        getIngredientsRequest: false,
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
        selectedIngredient: null,
      }
    }
    default: {
      return state
    }
  }
}