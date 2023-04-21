import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient';
import PropTypes from "prop-types";

function BurgerIngredients(ingredients) {
  const [current, setCurrent] = React.useState('bun')
  return (
    <section className={burgerIngredientsStyles.main_container}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>
        Соберите бургер
      </h1>
      <nav className={burgerIngredientsStyles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <div className={`${burgerIngredientsStyles.ingredients_container} pt-10`}>
        <h2 style={{margin: 0}} className='text text_type_main-medium'>Булки</h2>
        <ul className={`${burgerIngredientsStyles.ingredients_list} ml-4 mr-4`}>
          {ingredients && ingredients.map((ingredient) => ingredient.type === 'bun' && 
            <li key={ingredient._id}>
              <Ingredient key={ingredient._id} ingredient={ingredients} />
            </li>
          )}
        </ul>
        <h2 style={{margin: 0}} className='text text_type_main-medium'>Соусы</h2>
        <ul className={`${burgerIngredientsStyles.ingredients_list} ml-4 mr-4`}>
          {ingredients && ingredients.map((ingredient) => ingredient.type === 'sauce' && 
            <li key={ingredient._id}>
              <Ingredient key={ingredient._id} ingredient={ingredient} />
            </li>
          )}
        </ul>
        <h2 style={{margin: 0}} className='text text_type_main-medium'>Начинки</h2>
        <ul className={`${burgerIngredientsStyles.ingredients_list} ml-4 mr-4`}>
          {ingredients && ingredients.map((ingredient) => ingredient.type === 'main' && 
            <li key={ingredient._id}>
              <Ingredient key={ingredient._id} ingredient={ingredient} />
            </li>
          )}
        </ul>
      </div>
    <div>
      
    </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
}

export default BurgerIngredients;