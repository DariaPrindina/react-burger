import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer'
import { orderReducer } from './order-reducer'
import { popupReducer } from './popup';
import { constructorReducer } from './constructor-ingredients-reducer';
import { userReducer } from './user-reducer';
import { wsReducer } from './ws-reducer';
import { wsReducerAuth } from './ws-reducer-auth';

export const rootReducer = combineReducers({
  ingredientsReducer,
  orderReducer,
  popupReducer,
  constructorReducer,
  userReducer,
  wsReducer,
  wsReducerAuth
});