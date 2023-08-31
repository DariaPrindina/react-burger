import FeedOrderPreviewStyles from './feed-order-preview.module.css'
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "../../services/hooks";
import { useLocation, useParams } from "react-router-dom";
import { wsConnectionClosedAuth, wsConnectionStartAuth } from '../../services/actions/ws-actions-auth';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/ws-actions';

export const FeedOrderPreview = () => {
  const location = useLocation()
  const background = location.state && location.state.background
  const dispatch = useDispatch()
  const { id } = useParams()
  const orders = useSelector(store => store.wsReducer.ordersData)
  const ordersAuth = useSelector(store => store.wsReducerAuth.ordersDataAuth)
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
  
  const unauthUser = location.pathname.includes('feed')

  let ordersType = unauthUser ? orders?.orders : ordersAuth?.orders 

  const order = ordersType?.find(
    (item) => item._id === id
  )

  const ingredientsList = order?.ingredients?.map((item) => {
    const ingredient = ingredients.find(
      (element: any) => {
        return element._id === item
      }
    )    
    return ingredient
  })

  const uniqueIngredients = Array.from(new Set(ingredientsList));

  const count = ingredientsList?.reduce((prev: any, ingredient) => prev + ingredient?.price, 0)

  useEffect(() => {
    if(!order && !unauthUser && !background){
        dispatch(wsConnectionStartAuth())
    }
    return () => {
      if(!unauthUser) {
        dispatch(wsConnectionClosedAuth())
      }
    }
  }, [dispatch, order, unauthUser, background])

  useEffect(() => {
    if(!order && unauthUser && !background) {
      dispatch(wsConnectionStart())
    }
    return () => {
      if(unauthUser) {
        dispatch(wsConnectionClosed())
      }
    }
  }, [dispatch, order, unauthUser, background])

  return (
    <>
      {order &&
        <div className={FeedOrderPreviewStyles.modal}>
          <p className={`text text_type_digits-default mt-10 mb-5 ${FeedOrderPreviewStyles.number}`}>{`#${order.number}`}</p>
          <p className={`text text_type_main-medium`}>{order.name}</p>
          <span className={`text text_type_main-default mt-2 mb-15 ${FeedOrderPreviewStyles.status}`}>{order.status === 'done' ? 'Выполнен' : 'В работе'}</span>
          <p className='text text_type_main-medium mb-6'>Состав:</p>
          <ul className={FeedOrderPreviewStyles.ingredients_list}>
            {uniqueIngredients?.map((item) => {    
            return (
                <li className={FeedOrderPreviewStyles.ingredient_item} key={item?._id}>
                  <div className={FeedOrderPreviewStyles.ingredient_name_img}>
                    <div className={FeedOrderPreviewStyles.shape}>
                      <div className={FeedOrderPreviewStyles.black_circle}>
                        <img className={FeedOrderPreviewStyles.image} src={item?.image_mobile} alt={item?.name}></img>
                      </div>
                    </div>
                    <p className='text text_type_main-default'>{item?.name}</p>
                  </div>
                  <div className={`${FeedOrderPreviewStyles.count_box}`}>
                    <span className={`${FeedOrderPreviewStyles.count} text text_type_digits-default`}>{
                      ingredientsList?.filter(element => element?._id === item?._id).length
                    }{` x ${item?.price}`}</span>
                    <CurrencyIcon type='primary'/>
                  </div>
                </li>
              )}
              )
            }
          </ul>
          <div className={`mt-10 mb-10 ${FeedOrderPreviewStyles.time_count}`}>
            <div className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order?.createdAt)}/>
            </div>
            <div className={FeedOrderPreviewStyles.total}>
              <span className={`text text_type_digits-default`}>{count}</span>
              <CurrencyIcon type='primary'/>
            </div>
          </div>
        </div>
      }
    </>
  );
};


export default FeedOrderPreview;