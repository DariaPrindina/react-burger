import { act } from '@testing-library/react'
import {
  ADD_CONSTRUCTOR_INGREDIENT, 
  DELETE_CONSTRUCTOR_INGREDIENT,
  SORT_CONSTRUCTOR_INGREDIENTS,
  DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
} from '../actions/constructor-ingredients'

const initialState = {
  bun: null,
  otherIngredients: [],
}

export const constructorReducer = (state = initialState, action) => {
  // switch (action.type) {
  //   case ADD_CONSTRUCTOR_INGREDIENT: 
      
  // }
}
