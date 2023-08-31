import {
  TOGGLE_POPUP_INGREDIENT,
  TOGGLE_POPUP_ORDER,
  TOGGLE_POPUP_FEED_ORDER
} from '../action-types/popup-types'
import { TPopupActions } from '../actions/popup'

export type TPopupInitialState = {
  popupIngredientOpen: boolean,
  popupOrderOpen: boolean,
  popupFeedOrderOpen: boolean;
}

const initialState: TPopupInitialState = {
  popupIngredientOpen: false,
  popupOrderOpen: false,
  popupFeedOrderOpen: false
}

export const popupReducer = (
  state = initialState, 
  action: TPopupActions
  ) => {
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
    case TOGGLE_POPUP_FEED_ORDER: {
      return {
        ...state,
        popupFeedOrderOpen: action.payload,
      }
    }
    default: {
      return state
    }
  }
}