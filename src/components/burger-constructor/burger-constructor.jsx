import React, { useState, useContext, useEffect, useReducer, useMemo } from 'react'
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'
import useModal from '../hooks/useModal';
import { ItemContext } from '../services/ItemContext';
import { orderPostApi } from '../api/orderPostApi';
import { OrderContext } from '../services/orderContext';

const BurgerConstructor = () => {
  const ingredients = useContext(ItemContext)
  const { order, setOrder } = useContext(OrderContext)
  
  const { isModalOpen, openModal, closeModal } = useModal();

  // const [order, setOrder] = useState(null)

  const ingredientsData = useMemo(() => ({
    'bun': ingredients.filter((ingredient) => ingredient.type === 'bun')[0],
    'otherIngredients': ingredients.filter((ingredient) => ingredient.type !== 'bun'),
  }), [ingredients])

  const {bun, otherIngredients} = ingredientsData
  
  // const idBuns = useMemo(() => ingredients.map(el => el["_id"]), [...ingredients])
  // const idOtherIngredients = useMemo(() => ingredients.map(el => el["_id"]), [...ingredients])

  const idIngredients = {
    "ingredients": [
      order.bun._id,
      order.otherIngredients.map((ingredient) => {ingredient._id})
    ]
  }

  function submitOrder() {
    openModal();
    orderPostApi(idIngredients, setOrder)
  }

   const orderTotalPrice = useMemo(() => {
    (order.bun ? (order.bun.price * 2) : 0)
      + (order.otherIngredients.reduce((prev, ingr) => {prev + ingr.price}, 0))    
   }, [order]);
   
  return (
    <>
    <section>
      <ul className={`${burgerConstructorStyles.list} mt-25`}>
        {bun && 
          <li className={`${burgerConstructorStyles.element} pl-8 pr-4`}>
             <ConstructorElement
               text={`${bun?.name} (верх)`}
               thumbnail={bun?.image_mobile}
               price={bun?.price}
               type="top"
               isLocked={true}
              />
          </li>
        }
        <ul className={`${burgerConstructorStyles.list_list}`}>
        {otherIngredients && otherIngredients.map((ingredient) => (
          <li key={ingredient._id} className={`${burgerConstructorStyles.element} pl-4 pr-4`}>
            <DragIcon />
            <ConstructorElement
              text={ingredient.name}
              thumbnail={ingredient.image_mobile}
              price={ingredient.price}
              isLocked={false}
            />
          </li>
          )
        )}
        </ul>
        {bun &&
          <li className={`${burgerConstructorStyles.element} pl-8 pr-4`}>
            <ConstructorElement
              text={`${bun?.name} (низ)`}
              thumbnail={bun?.image_mobile}
              price={bun?.price}
              type="bottom"
              isLocked={true}
            />
          </li>
        }
      </ul>
      <div className={`${burgerConstructorStyles.price_container} mt-10 pr-4`}>
        <div className={`${burgerConstructorStyles.price} mr-10`}>
          <span className="text text_type_digits-medium">{orderTotalPrice}</span>
          <CurrencyIcon />  
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
    {isModalOpen &&
      <Modal  handleClose={closeModal}>
        <OrderDetails orderNumber={order.order.number}/>
      </Modal>  
    }
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  bun: PropTypes.object
}

export default BurgerConstructor;
