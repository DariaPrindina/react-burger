import React, { useContext, useMemo } from 'react'
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'
import useModal from '../hooks/useModal';
import { ItemContext } from '../services/ItemContext';
import { orderPostApi } from '../api/orderPostApi';
import { OrderContext } from '../services/orderContext';
import { ingredientPropTypes } from '../utils/prop-types'

const BurgerConstructor = () => {
  const ingredients = useContext(ItemContext)
  const { setOrder } = useContext(OrderContext)
  const { isModalOpen, openModal, closeModal } = useModal();

  const bun = useMemo(
    () => ingredients.find((ingr) => ingr.type === 'bun'),
    [ingredients]
  )
  
  const otherIngredients = useMemo(
    () => ingredients.filter((ingr) => ingr.type !== 'bun'),
    [ingredients]
  )

  const idIngredients = useMemo(
    () => ingredients.map((ingr) => ingr._id),
    [ingredients]
  )


  const getOrderId = () => {
    orderPostApi(idIngredients, setOrder)
  }

  const submitOrder = () => {
    getOrderId()
    openModal();
  }

  const orderTotalPrice = useMemo(() => {
    const otherIngredientsPrice = otherIngredients?.reduce((prev, ingr) => {
      return prev + ingr.price
    }, 0)
    return otherIngredientsPrice + (bun ? bun.price * 2 : 0)
  }, [bun, otherIngredients])
   
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
          {orderTotalPrice &&
            <span className="text text_type_digits-medium">{orderTotalPrice}</span>
          }
          <CurrencyIcon />  
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
    {isModalOpen &&
      <Modal  handleClose={closeModal}>
        <OrderDetails />
      </Modal>  
    }
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  bun: PropTypes.object,
  orderTotalPrice: PropTypes.number
}

export default BurgerConstructor;