import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { rootReducer } from '../reducers/root-reducer';
import { TConstructorIngredientsActions } from '../actions/constructor-ingredients'
import { TFeedOrderActions } from '../actions/feed-order';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TPopupActions } from '../actions/popup';
import { TWsAuthActions } from '../actions/ws-actions-auth';
import { TWsActions } from '../actions/ws-actions';

export type TApplicationActions = 
  | TConstructorIngredientsActions
  | TFeedOrderActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TPopupActions
  | TUserActions
  | TWsAuthActions
  | TWsActions
;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;