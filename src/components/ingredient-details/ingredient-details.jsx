import { useSelector } from 'react-redux';
import ingredientDetailsStyles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom';

const IngredientDetails = ({title}) => {
  const { id } = useParams()
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients)
  const ingredient = ingredients.find(element => element._id === id)

  return (
    <> 
      {ingredient && (
        <div className={ingredientDetailsStyles.modal}>
          {title && <h2 className={`${ingredientDetailsStyles.title} text text_type_main-large mt-30`}>{title}</h2>}
          <img src={ingredient.image_large} alt={ingredient.name} />
          <p className={`text text_type_main-medium mt-4 mb-8 ${ingredientDetailsStyles.name}`}>{ingredient.name}</p>
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
    </>
  )
}

export default IngredientDetails;