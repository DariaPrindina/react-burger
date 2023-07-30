import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import feedItemStyles from "./feed-item.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const FeedItem = ({ orderData }) => {
  const {ingredients} = useSelector(store => store.ingredientsReducer);
  const {_id, status, name, number, createdAt} = orderData
  const orderIngredients = orderData.ingredients
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const ingredientsList = orderData.ingredients.map(item => {
    const ingredient = ingredients.find(
      (element) => {
        return element._id === item
      }
    )
    return ingredient
  })
  
  const ingredientsListLength = ingredientsList.length

  const handleFeedOrderClick = (order) => {
    navigate(`/feed/${_id}`, {state: { background: location}})
    return;
  }

  const date = new Date(createdAt)

  const buns = ingredientsList.filter(item => item.type === 'bun')
  const oth = ingredientsList.filter(item => item.type !== 'bun')
  
  const orderPrice = () => {
    const otherIngr = oth?.reduce((prev, ingredient) => {
        return prev + ingredient.price
    }, 0)
    const bunsPrice = buns.map(bun => bun.price)[0]
      return otherIngr + (bunsPrice * 2)
  }

  return (
    ingredientsListLength > 2 &&
    buns.length === 2 &&
      <Link 
    onClick={() => handleFeedOrderClick(orderData)}
    to={`/feed/${_id}`}
    state={{background: location}}
    key={_id}   
    className={feedItemStyles.link}
    >
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
                return (
                  <li className={feedItemStyles.shape} key={id}>
                    <div className={feedItemStyles.black_circle}>
                      {ingredient && <img className={feedItemStyles.image} src={ingredient?.image} alt={ingredient?.name}></img>}
                    </div>
                  </li>

                ) 
              }
            }).reverse()
          }
        </ul>
        <div className={feedItemStyles.count}>
          <span className="text text_type_digits-default">{orderPrice()}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
