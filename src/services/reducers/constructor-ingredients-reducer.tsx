import {
  ADD_CONSTRUCTOR_INGREDIENT, 
  DELETE_CONSTRUCTOR_INGREDIENT,
  DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
  ADD_CONSTRUCTOR_BUN,
  REPLACE_CONSTRUCTOR_INGREDIENT,
} from '../action-types/constructor-ingredients-types'
import { TIngredient } from '../types/data'
import { TConstructorIngredientsActions } from '../actions/constructor-ingredients'

export type TConstructorInitialState = {
  bun?: TIngredient,
  otherIngredients: TIngredient[],
}

const initialState: TConstructorInitialState = {
  bun: undefined,
  otherIngredients: [],
}

export const constructorReducer = (
  state = initialState, 
  action: TConstructorIngredientsActions
  ) => {
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
    case REPLACE_CONSTRUCTOR_INGREDIENT: {
      const elements = [...state.otherIngredients]
      elements.splice(action.item.dragIndex, 0, 
      elements.splice(action.item.hoverIndex, 1)[0])
      return {
        ...state,
        otherIngredients: elements,
      }
    }
      default: {
        return state
      }
  }
}
