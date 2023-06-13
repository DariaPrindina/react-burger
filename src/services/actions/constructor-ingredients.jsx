import { v4 as uuidv4 } from 'uuid'

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT'
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT'
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN'

export const SORT_CONSTRUCTOR_INGREDIENTS = 'SORT_CONSTRUCTOR_INGREDIENTS'
export const DELETE_ALL_CONSTRUCTOR_INGREDIENTS = 'DELETE_ALL_CONSTRUCTOR_INGREDIENTS'

export const addConstructorIngredient = (ingredient) => {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    ingredient,
  }
}

export const deleteConstructorIngredient = (ingrId) => {
  return {
    type: DELETE_CONSTRUCTOR_INGREDIENT,
    ingrId,
  }
}

