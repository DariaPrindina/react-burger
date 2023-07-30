import feedStyles from './feed.module.css'
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { FeedItem } from '../../components/feed-item/feed-item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actions'
import { Loader } from '../../components/loader/loader';

export const Feed = () => {
  const dispatch = useDispatch()

  const {ordersData} = useSelector(store => store.wsReducer)
  const orders = ordersData?.orders
  const totalOrders = ordersData?.total
  const totalOrdersToday = ordersData?.totalToday
  
  useEffect(() => {
    dispatch(wsConnectionStart())
    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch])

  return (
    <div className={feedStyles.page}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>
        Лента заказов
      </h1>
      <main className={feedStyles.main}>
        <section className={feedStyles.items}>
          {orders
            ? orders.map(order => {
                return (
                  <FeedItem orderData={order} key={order._id}/>
                )}
              )
            : <Loader/>
          }
        </section>
        <section>
          <ul className={feedStyles.sections_list}>
            <li className={feedStyles.order_numbers}>
              <div className={feedStyles.ready_orders}>
                <h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
                <ul className={feedStyles.numbers_ready}>
                  {orders
                    ? orders.map(item => {
                      if(item.status === "done") {
                        return (
                          <li key={item._id}> 
                            <span className='text text_type_digits-default'>{item.number}</span>
                          </li>
                        )
                      }}
                      )
                    : <Loader/>
                  }
                </ul>
              </div>
              <div className={feedStyles.in_work_orders}>
                <h2 className='text text_type_main-medium mb-6'> В работе:</h2>
                <ul className={feedStyles.numbers_in_work}>
                  {orders 
                    ? orders.map(item => {
                    if(item.status !== "done") {
                      return (
                        <li key={item._id}> 
                          <span className='text text_type_digits-default'>{item.number}</span>
                        </li>
                      )
                    }})
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