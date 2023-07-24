import feedStyles from './feed.module.css'
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { FeedItem } from '../../components/feed-item/feed-item';
import {ordersExample} from '../../utils/example/example-orders'

export const Feed = () => {
  return (
    <div className={feedStyles.page}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>
        Лента заказов
      </h1>
      <main className={feedStyles.main}>
        <section className={feedStyles.items}>
          {ordersExample?.orders.map(order => (
            <FeedItem orderData={order} key={order._id}/>
            ))
          }
        </section>
        <section>
          <ul className={feedStyles.sections_list}>
            <li className={feedStyles.order_numbers}>
              <div className={feedStyles.ready_orders}>
                <h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
                <ul className={feedStyles.numbers_ready}>
                  {ordersExample.orders.map(item => {
                    if(item.status === "done") {
                      return (
                        <li>
                          <span className='text text_type_digits-default'>{item.number}</span>
                        </li>
                      )
                    }})
                  }
                </ul>
              </div>
              <div className={feedStyles.in_work_orders}>
                <h2 className='text text_type_main-medium mb-6'> В работе:</h2>
                <ul className={feedStyles.numbers_in_work}>
                  {ordersExample.orders.map(item => {
                    if(item.status === "done") {
                      return (
                        <li>
                          <span className='text text_type_digits-default'>{item.number}</span>
                        </li>
                      )
                    }})
                  }
                </ul>
              </div>
            </li>
            <li className={feedStyles.count_li}>
              <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
              <span className={`${feedStyles.shadow} text text_type_digits-large`}>28 752</span>
            </li>
            <li className={feedStyles.count_li}>
              <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
              <span className={`${feedStyles.shadow} text text_type_digits-large`}>138</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};