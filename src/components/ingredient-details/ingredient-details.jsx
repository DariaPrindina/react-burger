import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import ingredientDetailsStyles from './ingredient-details.module.css'

const IngredientDetails = () => {
  const ingredient = useSelector(store => store.ingredientsReducer.selectedIngredient);
  
  return (
    <div>
      <img src={ingredient.image_large} alt={ingredient.name}></img>
      <p className={`text text_type_main-medium mt-4 mb-8 ${ingredientDetailsStyles.title}`}>{ingredient.name}</p>
      <ul className={ingredientDetailsStyles.inform_list}>
        <li className={ingredientDetailsStyles.list_item}>
          <p className='pb-2 text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</span>
        </li>
        <li className={ingredientDetailsStyles.list_item}>
          <p className='pb-2 text text_type_main-default text_color_inactive'>Белки, г</p>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</span>
        </li>
        <li className={ingredientDetailsStyles.list_item}>
          <p className='pb-2 text text_type_main-default text_color_inactive'>Жиры, г</p>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</span>
        </li>
        <li className={ingredientDetailsStyles.list_item}>
          <p className='pb-2 text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

// IngredientDetails.propTypes = {
//   ingredient: PropTypes.object.isRequired
// }

export default IngredientDetails;