import React, { useRef } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dndIngredientStyles from './dnd-ingredient.module.css'
import { DELETE_CONSTRUCTOR_INGREDIENT, REPLACE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/constructor-ingredients'

const DndIngredient = ({index, ingredient}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const id = ingredient.id

  const [{isDragging}, drag] = useDrag({
    type: 'ingredient',
    item: {id, index},
    collect: (monitor) =>  {
      return {
        isDragging: monitor.isDragging()
      }
    }
  })

  const opacity = isDragging ? 0.5 : 1

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover(ingredients) {
      if (!ref.current) {return}
      const dragIndex = ingredients.index
      const hoverIndex = index
      dispatch({
        type: REPLACE_CONSTRUCTOR_INGREDIENT,
        item: {dragIndex, hoverIndex}
      })
      ingredients.index = hoverIndex
    }
  })
  
  const deleteIngredient = (itemId) => {
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      id: itemId,
    })
  } 

  drag(drop(ref))

  return (
    <li style={{opacity}} ref={ref} key={ingredient.id} className={`${dndIngredientStyles.element} pl-4 pr-4`}>
        <div className={dndIngredientStyles.drag_icon}>
          <DragIcon />
        </div>
        <ConstructorElement
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          price={ingredient.price}
          isLocked={false}
          handleClose={(() => deleteIngredient(id))}
        />
    </li>
  )
}

export default DndIngredient