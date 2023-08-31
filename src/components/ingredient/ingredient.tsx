import { useSelector, useDispatch } from "../../services/hooks";
import React, { FC } from 'react'
import { Link, useLocation } from "react-router-dom";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'
import { useDrag } from 'react-dnd';
import { popupAddIngredient } from "../../services/actions/ingredients";
import { togglePopupIngredient } from "../../services/actions/popup";
import { TIngredient, TIngredientFc } from "../../services/types/data";

const Ingredient: FC<TIngredientFc> = ({ingredient}) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const {name, price, image, _id} = ingredient

  const bun = useSelector(store => store.constructorReducer.bun)
  const otherIngredients = useSelector(store => store.constructorReducer.otherIngredients)
  const allIngredientsConstructor = [bun, ...otherIngredients, bun]
  
  let count = 0

  allIngredientsConstructor.forEach(
    (item) => {
      if (item?._id === _id) {
        (count += 1)
      }
    }
  )

  const handleIngredientClick = (ingredient: TIngredient) => {
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
    <Link 
      onClick={() => handleIngredientClick(ingredient)}
      className={ingredientStyles.link}
      to={`/ingredients/${_id}`}
      state={{background: location}}
      key={_id}
    >
    <div 
      ref={dragRef} 
      className={`${ingredientStyles.container_ingredient} ${isDragging && ingredientStyles.drag}`} 
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
          <Counter count={count} size="default" />
        }
    </div>
      </Link>
  )
}

export default React.memo(Ingredient)