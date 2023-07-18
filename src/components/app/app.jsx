import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { 
  Routes, 
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';

import appStyles from './app.module.css';
import AppHeader from '../header/header'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import { 
  Register, 
  Login, 
  ForgotPassword, 
  ResetPassword, 
  NotFound, 
  Profile 
} from '../../pages';

import { getUser, refreshTokenFunction } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/ingredients';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

import { togglePopupOrder } from '../../services/actions/popup';
import { popupDeleteIngredient } from '../../services/actions/ingredients';
import { togglePopupIngredient } from '../../services/actions/popup';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details';

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const background = location.state && location.state.background
  const navigate = useNavigate()

  const isModalOrderOpen = useSelector(store => store.popupReducer.popupOrderOpen)
  const ingredientsFailed = useSelector(state => state.ingredientsReducer.getIngredientsFailed)

  const refreshToken = localStorage.getItem('refreshToken')
  const accessToken = localStorage.getItem('accessToken')

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

  useEffect(()=> {
    !accessToken && !refreshToken && dispatch(refreshTokenFunction())
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
          <Route 
            path='/' 
            exact
            element={
              <main className={appStyles.main}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </main>
            } 
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<ProtectedRouteElement element={<Register />} location='/register'/>}/>
          <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPassword />} location='/forgot-password'/>}/>
          <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPassword />} location='/reset-password'/>}/>
          <Route path='*' element={<NotFound />}/>
          <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} location='/profile'/>}/>
          <Route 
            path='/ingredients/:id' 
            element={
                <IngredientDetails title='Детали ингредиента'/>
            }
          />
        </Routes>
        
        {background && (
          <Route path='/ingredients/:id'
            element={
              <Modal handleClose={closeIngredientModal} title='Детали ингредиента' >
                <IngredientDetails />
              </Modal>
            }
          />
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
