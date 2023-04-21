import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [ingredientsData, setIngredients] = useState()

  const  responseStatus = (res) => {
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка 1: ${res} ${res.status}`)
  }

  const getData = () => {
    return fetch(apiUrl)
    .then(responseStatus)
    .then((res) => {
      setIngredients(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  })


  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={ingredientsData}/>
        <BurgerConstructor ingredients={ingredientsData}/>
      </main>
    </div>
  );
}

export default App;
