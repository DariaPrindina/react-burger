import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route } from 'react-router-dom';

import appStyles from './app.module.css';
import AppHeader from '../header/header'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import { Register, Login, ForgotPassword, ResetPassword, NotFound } from '../../pages';

import { getIngredients } from '../../services/actions/ingredients';

const App = () => {
  const ingredientsFailed = useSelector(state => state.ingredientsReducer.getIngredientsFailed)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

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
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </>
    </div>
    )
  );
}

export default App;
