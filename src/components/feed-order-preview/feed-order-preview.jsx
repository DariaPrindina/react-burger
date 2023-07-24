import FeedOrderPreviewStyles from './feed-order-preview.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const FeedOrderPreview = ({ orderData }) => {
  const {ingredients} = useSelector(store => store.ingredientsReducer);
  const {_id, status, number, createdAt} = orderData
  const orderIngredients = orderData.ingredients
  const location = useLocation()

  const ingredientsList = orderData.ingredients.map(item => {
    const ingredient = ingredients.find(
      (element) => element._id === item
    )
    return ingredient
  })

  return (
    <>
      <div className={FeedOrderPreviewStyles.modal}>
        <h2 className={`${FeedOrderPreviewStyles.title} text text_type_main-large mt-30`}>jjjj</h2>
        <img src='' alt='' />
        <p className={`text text_type_main-medium mt-4 mb-8 ${FeedOrderPreviewStyles.name}`}>dd</p>
        <ul className={FeedOrderPreviewStyles.inform_list}>
          <li className={FeedOrderPreviewStyles.list_item}>
            <p className='pb-2 text text_type_main-default text_color_inactive'>Калории,ккал</p>
            <span className='text text_type_digits-default text_color_inactive'>fdkfdk</span>
          </li>
          <li className={FeedOrderPreviewStyles.list_item}>
            <p className='pb-2 text text_type_main-default text_color_inactive'>Белки, г</p>
            <span className='text text_type_digits-default text_color_inactive'>dfkdkf</span>
          </li>
          <li className={FeedOrderPreviewStyles.list_item}>
            <p className='pb-2 text text_type_main-default text_color_inactive'>Жиры, г</p>
            <span className='text text_type_digits-default text_color_inactive'>dkfjjfk</span>
          </li>
          <li className={FeedOrderPreviewStyles.list_item}>
            <p className='pb-2 text text_type_main-default text_color_inactive'>Углеводы, г</p>
            <span className='text text_type_digits-default text_color_inactive'>dijfidjf</span>
          </li>
        </ul>
      </div>
    </>
  );
};


export default FeedOrderPreview;