import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import { ItemContext } from '../services/ItemContext';
import { OrderContext } from '../services/orderContext';
import { getIngredientsData } from '../api/getIngredientsData'

const App = () => {
  const [ingredientsData, setIngredientsData] = useState([])
  const [order, setOrder] = useState('')
  

  useEffect(() => {
    getIngredientsData(setIngredientsData)
  }, [])

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <ItemContext.Provider value={ingredientsData}>
          <OrderContext.Provider value={{order, setOrder}}>
            <BurgerIngredients />
            <BurgerConstructor />
          </OrderContext.Provider>
        </ItemContext.Provider>
      </main>
    </div>
  );
}

export default App;
