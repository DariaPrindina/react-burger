import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './header.module.css'
import { Link } from 'react-router-dom'

function AppHeader(){
  return (
    <header className={`${headerStyles.header} text text_type_main-default text_color_inactive mt-5 ml-10 mr-10`}>
      <div className={`${headerStyles.content} p-4`}>
        <nav className={headerStyles.navbar}>
        <Link to='/' className={`${headerStyles.constructor} pl-5 pr-5 pt-4 pb-4`}>
          <BurgerIcon type="secondary"/>
          <span className={`${headerStyles.span} ml-2`}>Конструктор</span>
        </Link>
        <Link to='/' className={`${headerStyles.order_feed} pl-5 pr-5 pt-4 pb-4`}>
          <ListIcon type="secondary"/>
          <span className="ml-2">Лента заказов</span>
        </Link>
        </nav>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <Link to='/profile' className={`${headerStyles.account_link} pl-5 pr-5 pt-4 pb-4`}>
          <ProfileIcon type="secondary"/>
          <span className="ml-2">Личный кабинет</span>
        </Link>
      </div>
    </header>
  )
}

export default AppHeader;