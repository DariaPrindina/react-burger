import { useSelector, useDispatch } from "react-redux";
import React, { useMemo } from 'react'
import { Link, useLocation } from "react-router-dom";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'
import PropTypes from "prop-types";
import { useDrag } from 'react-dnd';
import { popupAddIngredient } from "../../services/actions/ingredients";
import { togglePopupIngredient } from "../../services/actions/popup";

const Ingredient = ({ingredient}) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const {name, price, image, _id} = ingredient

  const bun = useSelector(store => store.constructorReducer.bun)
  const otherIngredients = useSelector(store => store.constructorReducer.otherIngredients)
  const allIngredientsConstructor = otherIngredients.concat(bun, bun)

  let count = 0

  useMemo(() => {
    allIngredientsConstructor.forEach(
    (item) => {
      if (item?._id === _id) {
        (count += 1)
      }
    }
  )
  }, [allIngredientsConstructor])

  const handleIngredientClick = (ingredient) => {
    dispatch(popupAddIngredient(ingredient))
    dispatch(togglePopupIngredient(true))
  }

  const [{isDragging}, dragRef] = useDrag({
    type: 'items',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  return(
    <div 
      ref={dragRef} 
      className={`${ingredientStyles.container_ingredient} ${isDragging && ingredientStyles.drag}`} 
    >
      <Link 
        onClick={() => handleIngredientClick(ingredient)}
        className={ingredientStyles.link}
          to={{
            pathname: `/ingredients/${_id}`,
            state: {background: location}
          }}
        key={_id}
        >
        <div className='pl-4 pr-4'>
          <img src={image} alt={name} />
        </div>
        <div className={`${ingredientStyles.price} mt-1 mb-1`}>
          <span className='mr-2 text text_type_digits-default'>
            {price}
          </span>
          <CurrencyIcon type="primary"/>
        </div>
        <h3 className={`${ingredientStyles.ingredient_header} mr-2 text text_type_main-default`}>
          {name}
        </h3>
        {count > 0 &&
          <Counter count={count} size="default" />}
      </Link>
    </div>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
}

export default React.memo(Ingredient)