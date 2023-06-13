import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import appStyles from './app.module.css';
import AppHeader from '../header/header'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

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
        <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
    </div>
    )
  );
}

export default App;
