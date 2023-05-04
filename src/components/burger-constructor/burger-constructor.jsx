import React, {useState} from 'react'
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css'
import PropTypes from "prop-types";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'

const BurgerConstructor = ({ingredients, buns}) => {
  const [modal, setModal] = useState(null)

  const closeModal = () => {
    setModal(null)
  }

  return (
    <>
    <section>
      <ul className={`${burgerConstructorStyles.list} mt-25`}>
        <li className={`${burgerConstructorStyles.element} pl-8 pr-4`}>
           <ConstructorElement
             text={`${buns?.name} (верх)`}
             thumbnail={buns?.image_mobile}
             price={buns?.price}
             type="top"
             isLocked={true}
            />
            </li>
        <ul className={`${burgerConstructorStyles.list_list}`}>
        {ingredients && ingredients.map((ingredient) => ingredient.type === 'main' &&
          <li key={ingredient._id} className={`${burgerConstructorStyles.element} pl-4 pr-4`}>
            <DragIcon />
            <ConstructorElement
              text={ingredient.name}
              thumbnail={ingredient.image_mobile}
              price={ingredient.price}
              isLocked={false}
            />
          </li>
        )}
        </ul>
        <li className={`${burgerConstructorStyles.element} pl-8 pr-4`}>
          <ConstructorElement
            text={`${buns?.name} (низ)`}
            thumbnail={buns?.image_mobile}
            price={buns?.price}
            type="bottom"
            isLocked={true}
          />
        </li>
      </ul>
      <div className={`${burgerConstructorStyles.price_container} mt-10 pr-4`}>
        <div className={`${burgerConstructorStyles.price} mr-10`}>
          <span className="text text_type_digits-medium">9328</span>
          <CurrencyIcon />  
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={setModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
    {modal &&
      <Modal  handleClose={closeModal}>
        <OrderDetails/>
      </Modal>  
    }
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
  buns: PropTypes.object
}

export default BurgerConstructor;
