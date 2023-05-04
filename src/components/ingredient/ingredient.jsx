import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'
import PropTypes from "prop-types";

const Ingredient = ({ingredient, openModal}) => {
  const {name, price, image} = ingredient
  const clickIngr = () => {
    openModal(ingredient)
  }

  return(
    <div className={ingredientStyles.container_ingredient} onClick={clickIngr}>
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

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired
}

export default Ingredient