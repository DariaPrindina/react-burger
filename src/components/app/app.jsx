import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route } from 'react-router-dom';

import appStyles from './app.module.css';
import AppHeader from '../header/header'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import { Register, Login, ForgotPassword, ResetPassword, NotFound, Profile } from '../../pages';
import { getUser, refreshTokenFunction } from '../../services/actions/user';

import { getIngredients } from '../../services/actions/ingredients';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

const App = () => {
  const dispatch = useDispatch()
  const ingredientsFailed = useSelector(state => state.ingredientsReducer.getIngredientsFailed)
  const refreshToken = localStorage.getItem('refreshToken')
  const accessToken = localStorage.getItem('accessToken')
  const {authentification} = useSelector(store => store.userReducer)
  
  const {user} = useSelector(store => store.userReducer)

  console.log(user)
  console.log(authentification)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(()=> {
    !accessToken && !refreshToken && dispatch(refreshTokenFunction())
  }, [accessToken, refreshToken, dispatch])


  return (
    ingredientsFailed ? (
      <div className={appStyles.error}>
        <p className={`${appStyles.text_error} text text_type_main-large`}>{`Упс... Ингредиенты были похищены :(`}</p>
        <p className={`${appStyles.text_error} text text_type_main-default mt-8`}>Попробуйте перезагрузить страницу</p>
      </div>
      ) : (
    <div className={appStyles.app}>
      <AppHeader />
      <>
        <Routes>
          <Route path='/' element={
            <main className={appStyles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<ProtectedRouteElement element={<Register />} location='/register'/>}/>
          <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPassword />} location='/forgot-password'/>}/>
          <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPassword />} location='/reset-password'/>}/>
          <Route path='*' element={<NotFound />}/>
          <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} location='/profile'/>}/>
        </Routes>
      </>
    </div>
    )
  );
}

export default App;
