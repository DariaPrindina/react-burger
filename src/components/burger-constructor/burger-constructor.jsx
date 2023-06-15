import React, { useCallback, useMemo } from 'react'
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'
import { orderPost } from '../../services/actions/order'; 
import { ingredientPropTypes } from '../../utils/prop-types'
import { togglePopupOrder } from '../../services/actions/popup';
import { 
  ADD_CONSTRUCTOR_INGREDIENT,
  ADD_CONSTRUCTOR_BUN
 } from '../../services/actions/constructor-ingredients';
import { v4 as uuidv4 } from 'uuid'

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const isModalOrderOpen = useSelector(store => store.popupReducer.popupOrderOpen)
  const ingredients = useSelector(store => store.constructorReducer.otherIngredients)
  const bunConstructor = useSelector(store => store.constructorReducer.bun)

  const dropHandler = (ingr) => {
    ingr.id = uuidv4()
    ingr.type === 'bun' 
      ?
      dispatch({
        type: ADD_CONSTRUCTOR_BUN,
        bun: ingr,
      })
      :
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        otherIngredients: ingr,
      })
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: 'items',
    drop: (ingr) => {
      dropHandler(JSON.parse(JSON.stringify(ingr)))
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })
  
  const idIngredients = useMemo(
    () => ingredients.map((ingr) => ingr.id).concat([bunConstructor.id]),
    [ingredients, bunConstructor]
  )

  const submitOrder = () => {
    orderPost(idIngredients)
    dispatch(togglePopupOrder(true))
  }

  const closeModal = () => {
    dispatch(togglePopupOrder(false))
  }

  const orderTotalPrice = useMemo(() => {
    const otherIngredientsPrice = ingredients?.reduce((prev, ingr) => {
      return prev + ingr.price
    }, 0)
    return otherIngredientsPrice + (bunConstructor ? bunConstructor.price * 2 : 0)
  }, [bunConstructor, ingredients])

  const className = 
    `${burgerConstructorStyles.list} mt-25 
     ${isHover ?
     burgerConstructorStyles.onHover : ''}`
   
  return (
    <>
    <section>
      <ul ref={dropTarget} className={`${className}`}>
        {!bunConstructor 
          ? 
          <div className={burgerConstructorStyles.defContainer}>
            <p style={{textAlign:'center'}} className="text text_type_main-medium">Выберите булку</p>
          </div>
          :
          <li className={`${burgerConstructorStyles.element} pl-8 pr-4`}>
            <ConstructorElement
              text={`${bunConstructor?.name} (верх)`}
              thumbnail={bunConstructor?.image_mobile}
              price={bunConstructor?.price}
              type="top"
              isLocked={true}
            />
          </li>
        }
        <ul className={`${burgerConstructorStyles.list_list}`}>
        {!ingredients 
          ?
          <div className={burgerConstructorStyles.defContainer}>
            <p style={{textAlign:'center'}} className="text text_type_main-medium">Выберите ингредиенты</p>
          </div>
          :
          ingredients.map((ingredient) => (
          <li key={ingredient.id} className={`${burgerConstructorStyles.element} pl-4 pr-4`}>
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
        {!bunConstructor 
          ? 
          <div className={burgerConstructorStyles.defContainer}>
            <p style={{textAlign:'center'}} className="text text_type_main-medium">Выберите булку</p>
          </div>
          :               
          <li key={bunConstructor.id} className={`${burgerConstructorStyles.element} pl-8 pr-4`}>
            <ConstructorElement
              text={`${bunConstructor?.name} (низ)`}
              thumbnail={bunConstructor?.image_mobile}
              price={bunConstructor?.price}
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
    {isModalOrderOpen &&
      <Modal  handleClose={closeModal}>
        <OrderDetails />
      </Modal>  
    }
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  bunConstructor: PropTypes.object,
  orderTotalPrice: PropTypes.number
}

export default BurgerConstructor;