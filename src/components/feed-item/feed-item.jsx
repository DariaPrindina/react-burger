import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import feedItemStyles from "./feed-item.module.css";
import { useSelector } from "react-redux";

export const FeedItem = ({ orderData, children }) => {
  const {ingredients} = useSelector(store => store.ingredientsReducer);
  const {name, number, createdAt} = orderData

  const ingredientsList = orderData.ingredients.map(item => {
    const ingredient = ingredients.find(
      (element) => {
        return element._id === item
      }
    )
    return ingredient
  })

  const date = new Date(createdAt)

  const buns = ingredientsList.filter(item => item !== undefined && item.type === 'bun')
  const otherIngredients = ingredientsList.filter(item => item !== undefined && item.type !== 'bun')
  
  const orderPrice = () => {
    const otherIngredientsPrice = otherIngredients?.reduce((prev, ingredient) => {
        return prev + ingredient.price
    }, 0)
    const bunsPrice = buns?.reduce((prev, bun) => {
        return prev + bun.price
    }, 0)
      return otherIngredientsPrice + (bunsPrice ? bunsPrice : 0)
  }

  const ingredientsSliced = ingredientsList.slice(0, 6).toReversed()

  return (
    <div className={feedItemStyles.link}>
      <div className={feedItemStyles.top}>
        <p className="text text_type_digits-default">{`#${number}`}</p>
        <div className="text text_type_main-default text_color_inactive">
        <FormattedDate date={date}/>
        </div>
      </div>
      <div className={feedItemStyles.name}>
        <h2 className="text text_type_main-medium">
          {name}
        </h2>
        {children}
      </div>
      <div className={feedItemStyles.bottom}>
        <ul className={feedItemStyles.images_container}>
          {orderData && ingredientsSliced.map((ingredient, id) => {
              if (ingredientsList.length) {
                return (
                  <li className={feedItemStyles.shape} key={id}>
                    <div className={feedItemStyles.black_circle}>
                      {ingredient && <img className={feedItemStyles.image} src={ingredient?.image} alt={ingredient?.name}></img>}
                    </div>
                  </li>
                );
              }
            })
          }
        </ul>
        <div className={feedItemStyles.count}>
          <span className="text text_type_digits-default">{orderPrice()}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
