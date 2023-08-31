import feedStyles from './feed.module.css'
import { FeedItem } from '../../components/feed-item/feed-item';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect } from 'react';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actions'
import { Loader } from '../../components/loader/loader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TOrder } from '../../services/types/data';

export const Feed = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const {ordersData} = useSelector(store => store.wsReducer)

  const stor = useSelector(store => store)
  console.log("🚀 ~ file: feed.tsx:18 ~ Feed ~ stor:", stor)

  const orders = ordersData?.orders
  const totalOrders = ordersData?.total
  const totalOrdersToday = ordersData?.totalToday

  const handleFeedOrderClick = (order: TOrder) => {
    navigate(`/feed/${order._id}`, {state: { background: location}})
    return;
  }
  
  useEffect(() => {
    dispatch(wsConnectionStart())
    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch])

  const doneOrders = orders?.filter((item: TOrder) => item.status === 'done')
  const inWorkOrders = orders?.filter((item: TOrder) => item.status !== 'done')

  return (
    <div className={feedStyles.page}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>
        Лента заказов
      </h1>
      <main className={feedStyles.main}>
        <section className={feedStyles.items}>
          {orders
            ? orders.map((order: TOrder) => {
                return (
                  order?.ingredients.length >= 3 &&
                    <Link 
                      onClick={() => handleFeedOrderClick(order)}
                      to={`${order._id}`}
                      state={{background: location}}
                      key={order.number}   
                      className={feedStyles.link}
                    >
                      <FeedItem orderData={order} key={order._id}/>
                    </Link>
                )
              })
            : <Loader/>
          }
        </section>
        <section>
          <ul className={feedStyles.sections_list}>
            <li className={feedStyles.order_numbers}>
              <div className={feedStyles.ready_orders}>
                <h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
                <ul className={feedStyles.numbers_ready}>
                  {doneOrders
                    ? doneOrders.map((item: TOrder) => {
                        return (
                          <li key={item._id}> 
                            <span className='text text_type_digits-default'>{item.number}</span>
                          </li>
                        )
                      }
                      )
                    : <Loader/>
                  }
                </ul>
              </div>
              <div className={feedStyles.in_work_orders}>
                <h2 className='text text_type_main-medium mb-6'> В работе:</h2>
                <ul className={feedStyles.numbers_in_work}>
                  {inWorkOrders 
                    ? inWorkOrders.map((item: TOrder) => {
                      return (
                        <li key={item._id}> 
                          <span className='text text_type_digits-default'>{item.number}</span>
                        </li>
                      )
                    })
                    : <Loader/>
                  }
                </ul>
              </div>
            </li>
            <li className={feedStyles.count_li}>
              <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
              {orders 
                ? <span className={`${feedStyles.shadow} text text_type_digits-large`}>{totalOrders}</span>
                : <Loader/>
              }
            </li>
            <li className={feedStyles.count_li}>
              <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
              {orders 
                ? <span className={`${feedStyles.shadow} text text_type_digits-large`}>{totalOrdersToday}</span>
                : <Loader/>
              }
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};