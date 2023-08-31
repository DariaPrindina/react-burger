import { useMemo } from 'react'
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from '../../services/hooks';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css'
import { orderPost } from '../../services/actions/order';
import { togglePopupOrder } from '../../services/actions/popup';
import { 
  ADD_CONSTRUCTOR_INGREDIENT,
  ADD_CONSTRUCTOR_BUN
 } from '../../services/action-types/constructor-ingredients-types';
import { v4 as uuidv4 } from 'uuid'
import DndIngredient from '../dnd-ingredient/dnd-ingredient';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const ingredients = useSelector(store => store.constructorReducer.otherIngredients)
  const bunConstructor = useSelector(store => store.constructorReducer.bun)

  const {authentification} = useSelector(store => store.userReducer)

  const dropHandler = (ingredient: TIngredient) => {
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

  const IdIngredients = ingredients?.map((ingredient) => ingredient?._id)
  
  const submitOrder = () => {
    dispatch(orderPost([bunConstructor?._id, IdIngredients, bunConstructor?._id]))
    dispatch(togglePopupOrder(true))
  }

  const redirectToLogin = (evt: any): void => {
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
            <CurrencyIcon type='primary'/>  
          </div>
          <Button 
            htmlType="button" 
            type="primary" 
            size="large" 
            onClick={authentification ? submitOrder : redirectToLogin}
            disabled={bunConstructor ? false : true}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  )
}

export default BurgerConstructor;