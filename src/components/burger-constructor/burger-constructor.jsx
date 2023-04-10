import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css'
import PropTypes from "prop-types";

function BurgerConstructor({ingredients}) {
  const {name, price, image_mobile} = ingredients
  return (
    <section>
      <ul className={`${burgerConstructorStyles.list} mt-25`}>
        <li className={`${burgerConstructorStyles.element} pl-8 pr-4`}>
           <ConstructorElement
             text={`${name} (верх)`}
             thumbnail={image_mobile}
             price={price}
             type="top"
             isLocked={true}
            />
            </li>
        <ul className={`${burgerConstructorStyles.list_list}`}>
        {ingredients.map((ingredient) => ingredient.type === 'main' &&
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
            text={`${name} (низ)`}
            thumbnail={image_mobile}
            price={price}
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
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
}

export default BurgerConstructor;
