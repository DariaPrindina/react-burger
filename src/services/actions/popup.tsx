import {
  TOGGLE_POPUP_INGREDIENT,
  TOGGLE_POPUP_ORDER,
  TOGGLE_POPUP_FEED_ORDER
} from '../action-types/popup-types'

export interface ITogglePopupIngredient {
  readonly type: typeof TOGGLE_POPUP_INGREDIENT,
  payload: boolean;
}

export interface ITogglePopupOrder {
  readonly type: typeof TOGGLE_POPUP_ORDER,
  payload: boolean;
}

export interface ITogglePopupFeedOrder {
  readonly type: typeof TOGGLE_POPUP_FEED_ORDER,
  payload: boolean;
}

export type TPopupActions =
  | ITogglePopupIngredient
  | ITogglePopupOrder
  | ITogglePopupFeedOrder;

export const togglePopupIngredient =  (toggle: boolean) => ({ 
  type: TOGGLE_POPUP_INGREDIENT,
  payload: toggle,
})

export const togglePopupOrder =  (toggle: boolean) => ({ 
  type: TOGGLE_POPUP_ORDER,
  payload: toggle,
})

export const togglePopupFeedOrder =  (toggle: boolean) => ({ 
  type: TOGGLE_POPUP_FEED_ORDER,
  payload: toggle,
})