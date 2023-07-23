import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Routes, 
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';

import appStyles from './app.module.css';
import AppHeader from '../header/header'
import { 
  Home,
  Register, 
  Login, 
  ForgotPassword, 
  ResetPassword, 
  NotFound, 
  Profile,
  Feed 
} from '../../pages';

import { getUser } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/ingredients';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

import { togglePopupOrder } from '../../services/actions/popup';
import { popupDeleteIngredient } from '../../services/actions/ingredients';
import { togglePopupIngredient } from '../../services/actions/popup';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details';

import {
  mainPath,
  loginPath,
  registerPath,
  forgotPasswordPath,
  resetPasswordPath,
  notFoundPath,
  profilePath,
  ingredientsIdPath,
  feedPath,
  feedIdPath,
  profileOrdersPath,
  profileOrdersIdPath
} from '../../utils/rootes'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const background = location.state && location.state.background
  const navigate = useNavigate()

  const isModalOrderOpen = useSelector(store => store.popupReducer.popupOrderOpen)
  const ingredientsFailed = useSelector(state => state.ingredientsReducer.getIngredientsFailed)

  const closeOrderModal = () => {
    dispatch(togglePopupOrder(false))
  }

  const closeIngredientModal = () => {
    dispatch(togglePopupIngredient(false))
    dispatch(popupDeleteIngredient())
    navigate(-1)
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  if (ingredientsFailed) {
    return (
      <div className={appStyles.error}>
        <p className={`${appStyles.text_error} text text_type_main-large`}>{`Упс... Ингредиенты были похищены :(`}</p>
        <p className={`${appStyles.text_error} text text_type_main-default mt-8`}>Попробуйте перезагрузить страницу</p>
      </div>
    )
  }

  return (
    <>
      <div className={appStyles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path={mainPath} element={<Home />}/>
          <Route path={loginPath} element={<ProtectedRouteElement element={<Login />} onlyUnAuth={true} />} />
          <Route path={registerPath} element={<ProtectedRouteElement element={<Register />} onlyUnAuth={true} />} />
          <Route path={forgotPasswordPath} element={<ProtectedRouteElement element={<ForgotPassword />} onlyUnAuth={true} />} />
          <Route path={resetPasswordPath} element={<ProtectedRouteElement element={<ResetPassword />} onlyUnAuth={true} />} />
          <Route path={notFoundPath} element={<NotFound />}/>
          <Route path={profilePath} element={<ProtectedRouteElement element={<Profile />} onlyUnAuth={false} />}/>
          <Route path={ingredientsIdPath} element={<IngredientDetails title='Детали ингредиента'/>}/>
          <Route path={feedPath} element={<Feed />}/>
        </Routes>
        
        {background && (
          <Routes>
            <Route path={ingredientsIdPath}
              element={
                <Modal handleClose={closeIngredientModal} title='Детали ингредиента' >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}

        {isModalOrderOpen &&
        <Modal  handleClose={closeOrderModal}>
          <OrderDetails />
        </Modal>  
        }
      </div>
    </>
  );
}

export default App;
