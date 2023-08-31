import React, {useState, useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient';
import { useInView } from 'react-intersection-observer';
import { TIngredient } from '../../services/types/data';
import { useSelector } from '../../services/hooks';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients)

  const handleTabClick = (tab: string) => {
    setCurrent(tab)
    document.querySelector(`#${tab}`)?.scrollIntoView({ behavior: "smooth" })
  }

  const [bunRef, isBunActive] = useInView({ threshold: 0.25 })
  const [sauceRef, isSauceActive] = useInView({ threshold: 0.25 })
  const [mainRef, isMainActive] = useInView({ threshold: 0.25 })  

  useEffect(() => {
    if (isBunActive) {
      setCurrent('bun')
    } else if (isSauceActive) {
      setCurrent('sauce')
    } else if (isMainActive) {
      setCurrent('main')
    }
  }, [isBunActive, isSauceActive, isMainActive])

  return (
    <section className={burgerIngredientsStyles.main_container}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>
        Соберите бургер
      </h1>
      <nav className={burgerIngredientsStyles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </nav>
      <div className={`${burgerIngredientsStyles.ingredients_container} pt-5`}>
        <div ref={bunRef}>
          <h2 id='bun' className='text text_type_main-medium pt-5'>Булки</h2>
          <ul className={`${burgerIngredientsStyles.ingredients_list} ml-4 mr-4 mt-6 mb-5`}>
            {ingredients && ingredients.map((ingredient: TIngredient) => ingredient.type === 'bun' && 
              <li key={ingredient._id}>
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
        <div ref={sauceRef}>
          <h2 id='sauce' className='text text_type_main-medium pt-5'>Соусы</h2>
          <ul className={`${burgerIngredientsStyles.ingredients_list} ml-4 mr-4 mt-6 mb-5`}>
            {ingredients && ingredients.map((ingredient: TIngredient) => ingredient.type === 'sauce' && 
              <li key={ingredient._id}>
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
        <div ref={mainRef}>
          <h2 id='main' className='text text_type_main-medium pt-5'>Начинки</h2>
          <ul className={`${burgerIngredientsStyles.ingredients_list} ml-4 mr-4 mt-6 mb-5`}>
            {ingredients && ingredients.map((ingredient: TIngredient) => ingredient.type === 'main' && 
              <li key={ingredient._id}>
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients;