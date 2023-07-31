import FeedOrderPreviewStyles from './feed-order-preview.module.css'
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

export const FeedOrderPreview = () => {
  const location = useLocation()
  const { id } = useParams()
  const orders = useSelector(store => store.wsReducer.ordersData)
  const ordersAuth = useSelector(store => store.wsReducerAuth.ordersDataAuth)
  const {ingredients} = useSelector(store => store.ingredientsReducer);
   
  const unauthUser = location.pathname.includes('feed')

  let ordersType = unauthUser ? orders : ordersAuth 

  const order = ordersType?.orders?.find(
    (item) => {
      return item._id === id
    }
  )

  const ingredientsList = order?.ingredients?.map(item => {
    const ingredient = ingredients.find(
      (element) => {
        return element._id === item
      }
    )    
    return ingredient
  })

  const uniqueIngredients = Array.from(new Set(ingredientsList));

  const count = ingredientsList?.reduce((prev, ingredient) => prev + ingredient.price , 0)
  
  const date = new Date(order?.createdAt)

  return (
    order &&
      <div className={FeedOrderPreviewStyles.modal}>
        <p className={`text text_type_digits-default mt-10 mb-5 ${FeedOrderPreviewStyles.number}`}>{`#${order.number}`}</p>
        <p className={`text text_type_main-medium`}>{order.name}</p>
        <span className={`text text_type_main-default mt-2 mb-15 ${FeedOrderPreviewStyles.status}`}>{order.status === 'done' ? 'Выполнен' : 'В работе'}</span>
        <p className='text text_type_main-medium mb-6'>Состав:</p>
        <ul className={FeedOrderPreviewStyles.ingredients_list}>
          {uniqueIngredients?.map(item => {    
          return (
              <li className={FeedOrderPreviewStyles.ingredient_item} key={item._id}>
                <div className={FeedOrderPreviewStyles.ingredient_name_img}>
                  <div className={FeedOrderPreviewStyles.shape}>
                    <div className={FeedOrderPreviewStyles.black_circle}>
                      <img className={FeedOrderPreviewStyles.image} src={item.image_mobile} alt={item.name}></img>
                    </div>
                  </div>
                  <p className='text text_type_main-default'>{item.name}</p>
                </div>
                <div className={`${FeedOrderPreviewStyles.count_box}`}>
                  <span className={`${FeedOrderPreviewStyles.count} text text_type_digits-default`}>{
                    ingredientsList?.filter(element => element._id === item._id).length
                  }{` x ${item.price}`}</span>
                  <CurrencyIcon/>
                </div>
              </li>
            )}
            )
          }
        </ul>
        <div className={`mt-10 mb-10 ${FeedOrderPreviewStyles.time_count}`}>
          <div className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={date}/>
          </div>
          <div className={FeedOrderPreviewStyles.total}>
            <span className={`text text_type_digits-default`}>{count}</span>
            <CurrencyIcon/>
          </div>
        </div>
      </div>
  );
};


export default FeedOrderPreview;