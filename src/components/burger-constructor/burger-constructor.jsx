import { useMemo } from 'react'
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import { orderPost } from '../../services/actions/order';
import { togglePopupOrder } from '../../services/actions/popup';
import { ingredientPropTypes } from '../../utils/prop-types'
import { 
  ADD_CONSTRUCTOR_INGREDIENT,
  ADD_CONSTRUCTOR_BUN
 } from '../../services/actions/constructor-ingredients';
import { v4 as uuidv4 } from 'uuid'
import DndIngredient from '../dnd-ingredient/dnd-ingredient';
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const ingredients = useSelector(store => store.constructorReducer.otherIngredients)
  const bunConstructor = useSelector(store => store.constructorReducer.bun)

  const {authentification} = useSelector(store => store.userReducer)

  const dropHandler = (ingredient) => {
    ingredient.id = uuidv4()
    ingredient.type === 'bun' 
      ?
      dispatch({
        type: ADD_CONSTRUCTOR_BUN,
        bun: ingredient,
      })
      :
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        otherIngredients: ingredient,
      })
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: 'items',
    drop: (ingredient) => {
      dropHandler(JSON.parse(JSON.stringify(ingredient)))
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })
  
  const idIngredients = ingredients?.map((ingredient) => ingredient?._id).concat(bunConstructor?._id)

  const submitOrder = () => {
    dispatch(orderPost(idIngredients))
    dispatch(togglePopupOrder(true))
  }

  const redirectToLogin = (evt) => {
    evt.preventDefault()
    navigate('/login', { replace: true })
  }

  const orderTotalPrice = useMemo(() => {
    const otherIngredientsPrice = ingredients?.reduce((prev, ingr) => {
      return prev + ingr.price
    }, 0)
    return otherIngredientsPrice + (bunConstructor ? bunConstructor.price * 2 : 0)
  }, [bunConstructor, ingredients])

  const dottedBorder = 
  `${isHover && burgerConstructorStyles.onHover}`
   
  return (
    <>
      <section>
        <ul ref={dropTarget} className={`${burgerConstructorStyles.list} mt-25`}>
          {!bunConstructor 
            ? 
            <div className={`${dottedBorder} ${burgerConstructorStyles.defContainer}`}>
              <p className="text text_type_main-medium">Выберите булку</p>
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
          {ingredients.length === 0
            ?
            <div className={`${dottedBorder} ${burgerConstructorStyles.defContainerIngr}`}>
              <p className="text text_type_main-medium">Выберите ингредиенты</p>
            </div>
            :
            ingredients.map((ingredient, index) => (
              <DndIngredient key={ingredient.id} ingredient={ingredient} index={index} />
            )
          )}
          </ul>
          {!bunConstructor 
            ? 
            <div className={`${dottedBorder} ${burgerConstructorStyles.defContainer}`}>
              <p className="text text_type_main-medium">Выберите булку</p>
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
            {
              <span className="text text_type_digits-medium">{orderTotalPrice}</span>
            }
            <CurrencyIcon />  
          </div>
          <Button 
            htmlType="button" 
            type="primary" 
            size="large" 
            onClick={authentification ? submitOrder : redirectToLogin}
            disabled={ingredients.length > 0 ? false : true}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  bunConstructor: PropTypes.object,
  orderTotalPrice: PropTypes.number
}

export default BurgerConstructor;