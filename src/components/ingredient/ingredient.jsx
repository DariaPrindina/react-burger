import { useSelector, useDispatch } from "react-redux";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'
import PropTypes from "prop-types";
import { useDrag } from 'react-dnd';
import { POPUP_ADD_INGREDIENT } from "../../services/actions/ingredients";
import { OPEN_POPUP } from "../../services/actions/popup";
import { popupAddIngredient } from "../../services/actions/ingredients";
import { togglePopupIngredient } from "../../services/actions/popup";

const Ingredient = ({ingredient}) => {
  const dispatch = useDispatch()
  const {name, price, image, _id} = ingredient
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients)
  
  const clickIngr = () => {
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

  const opacity = isDragging ? 0 : 1;

  return(
    <div 
      ref={dragRef} 
      style={{ opacity }} 
      className={ingredientStyles.container_ingredient} 
      onClick={clickIngr}
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
      <h3 style={{margin: 0, height: 48}} className='mr-2 text text_type_main-default'>
        {name}
      </h3>
      <Counter count={1} size="default" />
    </div>
  )
}

// Ingredient.propTypes = {
//   ingredient: PropTypes.object.isRequired,
//   openModal: PropTypes.func.isRequired
// }

export default Ingredient