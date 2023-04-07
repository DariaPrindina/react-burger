import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import mainStyles from './main.module.css'
import {ingredientsData} from '../../utils/data'

function Main() {
  return (
    <div className={mainStyles.main}>
      <BurgerIngredients ingredients={ingredientsData}/>
      <BurgerConstructor ingredients={ingredientsData}/>
    </div>
  )
}

export default Main;