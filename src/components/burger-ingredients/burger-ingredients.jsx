import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient';
import PropTypes from "prop-types";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/prop-types'
import { popupDeleteIngredient } from '../../services/actions/ingredients';
import { togglePopupIngredient } from '../../services/actions/popup';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients)
  const isModalIngredientOpen = useSelector(store => store.popupReducer.popupIngredientOpen)
  const dispatch = useDispatch()

  const handleTabClick = (tab) => {
    setCurrent(tab)
    document.querySelector(`#${tab}`)?.scrollIntoView({ behavior: "smooth" })
  }

  const closeModal = () => {
    dispatch(togglePopupIngredient(false))
    dispatch(popupDeleteIngredient())
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
    <>
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
            {ingredients && ingredients.map((ingredient) => ingredient.type === 'bun' && 
              <li key={ingredient._id}>
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
        <div ref={sauceRef}>
          <h2 id='sauce' className='text text_type_main-medium pt-5'>Соусы</h2>
          <ul className={`${burgerIngredientsStyles.ingredients_list} ml-4 mr-4 mt-6 mb-5`}>
            {ingredients && ingredients.map((ingredient) => ingredient.type === 'sauce' && 
              <li key={ingredient._id}>
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
        <div ref={mainRef}>
          <h2 id='main' className='text text_type_main-medium pt-5'>Начинки</h2>
          <ul className={`${burgerIngredientsStyles.ingredients_list} ml-4 mr-4 mt-6 mb-5`}>
            {ingredients && ingredients.map((ingredient) => ingredient.type === 'main' && 
              <li key={ingredient._id}>
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
    {isModalIngredientOpen && 
      <Modal handleClose={closeModal} title='Детали ингредиента'>
        <IngredientDetails />
      </Modal>  
    }
    </>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
}

export default BurgerIngredients;