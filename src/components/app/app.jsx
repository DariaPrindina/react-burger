import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {
  const [ingredientsData, setIngredients] = useState([])

  useEffect(() => {
    const getData = () => {
      return fetch(apiUrl)
      .then((res) => {
        if (res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка 1: ${res} ${res.status}`)    
      })
      .then((res) => {
      setIngredients(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    getData();
  }, [])

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={ingredientsData}/>
        <BurgerConstructor ingredients={ingredientsData} buns={ingredientsData[0]}/>
      </main>
    </div>
  );
}

export default App;
