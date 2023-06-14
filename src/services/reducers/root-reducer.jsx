import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer'
import { orderReducer } from './order-reducer'
import { popupReducer } from './popup';
import { constructorReducer } from './constructor-ingredients-reducer';

export const rootReducer = combineReducers({
  ingredientsReducer,
  orderReducer,
  popupReducer,
  constructorReducer,
});