import { useDispatch, useSelector } from "react-redux"
import { FeedItem } from "../feed-item/feed-item"
import { Loader } from "../loader/loader"
import styles from './profile-orders.module.css'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { wsConnectionStartAuth, wsConnectionClosedAuth } from '../../services/actions/ws-actions-auth';


export const ProfileOrders = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const ordersDataAuth = useSelector(store => store.wsReducerAuth.ordersDataAuth.orders)

  const handleProfileOrderClick = (order) => {
    navigate(`orders/${order._id}`, {state: { background: location}})
    return;
  }

  useEffect(() => {
    dispatch(wsConnectionStartAuth())
    return () => {
      dispatch(wsConnectionClosedAuth())
    }
  }, [dispatch])


  return (
    <div className={`${styles.container} mt-30 pr-2`}>
      {ordersDataAuth 
        ? ordersDataAuth?.map(order => {
          return (
            <Link 
              onClick={() => handleProfileOrderClick(order)}
              to={`orders/${order._id}`}
              state={{background: location}}
              key={order.number}   
              className={styles.link}
            >
              <FeedItem orderData={order} key={order.number}>
                <div className={`${styles.span_container} mt-2`}>
                  <span className={`text text_type_main-default ${order.status === 'done' ? styles.done : styles.pending}`}>
                    {order.status === 'done' ? 'Выполнен' : 'Готовится'}
                  </span>
                  {order.status !== 'done' && <div><span class={styles.loader}></span></div>}
                </div>
              </FeedItem>
            </Link>
          )
          }).reverse()
        : <Loader/>
      }
    </div>
  )
}