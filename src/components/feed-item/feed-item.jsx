import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedItemStyles from "./feed-item.module.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const FeedItem = ({ orderData }) => {
  const {ingredients} = useSelector(store => store.ingredientsReducer);
  const {_id, status, number, createdAt} = orderData
  const orderIngredients = orderData.ingredients
  const location = useLocation()

  const ingredientsList = orderData.ingredients.map(item => {
    const ingredient = ingredients.find(
      (element) => element._id == item
    )
    return ingredient
  })

  const ingredientsListLength = ingredientsList.length

  return (
    <Link 
    to={`/profile/orders/${_id}`}
    state={{background: location}}
    key={_id}   
    className={feedItemStyles.link}
    >
      <div className={feedItemStyles.top}>
        <p className="text text_type_digits-default">{number}</p>
        <time className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </time>
      </div>
      <div className={feedItemStyles.name}>
        <h2 className="text text_type_main-medium">
          Death Star Starship Main бургер
        </h2>
      </div>
      <div className={feedItemStyles.bottom}>
        <ul className={feedItemStyles.images_container}>
          {orderData && ingredientsList.slice(0, 6).map((ingredient, id) => {
              if (ingredientsListLength <= 6) {
                return (
                  <li className={feedItemStyles.shape} key={id}>
                    <div className={feedItemStyles.black_circle}>
                      {ingredient && <img className={feedItemStyles.image} src={ingredient?.image} alt={ingredient?.name}></img>}
                    </div>
                  </li>
                );
              }
              if (ingredientsListLength > 6) {
                return 
              }
            }).reverse()
          
          }
        </ul>
        <div className={feedItemStyles.count}>
          <span className="text text_type_digits-default">480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
