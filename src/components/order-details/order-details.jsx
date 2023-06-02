import React, {useContext} from 'react'
import orderDone from '../../images/orderDone.svg'
import orderDetailsStyles from './order-details.module.css'
import { OrderContext } from '../services/orderContext';

const OrderDetails = () => {
  const { order } = useContext(OrderContext)
  return (
    <div className={orderDetailsStyles.content}>
      <p className='mb-8 mt-4 text text_type_digits-large'>{order}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img className={`mt-15 mb-15 ${orderDetailsStyles.image}`} src={orderDone} alt='заказ готовится'></img>
      <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
      <p className='pb-30 mt-2 text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;