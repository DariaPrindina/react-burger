import {
  TOGGLE_POPUP_INGREDIENT,
  TOGGLE_POPUP_ORDER,
} from '../actions/popup'

const initialState = {
  popupIngredientOpen: false,
  popupOrderOpen: false,
}

export const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_POPUP_INGREDIENT: {
      return {
        ...state,
        popupIngredientOpen: action.payload,
      }
    }
    case TOGGLE_POPUP_ORDER: {
      return {
        ...state,
        popupOrderOpen: action.payload,
      }
    }
    default: {
      return state
    }
  }
}