export const TOGGLE_POPUP_INGREDIENT = 'TOGGLE_POPUP_INGREDIENT' 
export const TOGGLE_POPUP_ORDER = 'TOGGLE_POPUP_ORDER'
export const TOGGLE_POPUP_FEED_ORDER = 'TOGGLE_POPUP_FEED_ORDER'


export const togglePopupIngredient =  (toggle) => ({ 
  type: TOGGLE_POPUP_INGREDIENT,
  payload: toggle,
})

export const togglePopupOrder =  (toggle) => ({ 
  type: TOGGLE_POPUP_ORDER,
  payload: toggle,
})

export const togglePopupFeedOrder =  (toggle) => ({ 
  type: TOGGLE_POPUP_FEED_ORDER,
  payload: toggle,
})