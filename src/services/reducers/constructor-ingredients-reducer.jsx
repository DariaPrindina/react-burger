import {
  ADD_CONSTRUCTOR_INGREDIENT, 
  DELETE_CONSTRUCTOR_INGREDIENT,
  DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
  ADD_CONSTRUCTOR_BUN,
} from '../actions/constructor-ingredients'

const initialState = {
  bun: null,
  otherIngredients: [],
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: 
      return {
        ...state,
        otherIngredients: [...state.otherIngredients, action.otherIngredients]
      }
    case ADD_CONSTRUCTOR_BUN: 
      return {
        ...state,
        bun: action.bun
      }
    case DELETE_CONSTRUCTOR_INGREDIENT: 
      return {
        ...state,
        otherIngredients: [...state.otherIngredients.filter((ingr) => ingr.id !== action.id)]
      }
    case DELETE_ALL_CONSTRUCTOR_INGREDIENTS:
      return {
        otherIngredients: [],
      }
      default: {
        return state
      }
  }
}
