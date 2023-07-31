import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './header.module.css'
import { NavLink } from 'react-router-dom'

function AppHeader(){
  return (
    <header className={`${headerStyles.header} mt-5 ml-10 mr-10`}>
      <div className={`${headerStyles.content} p-4`}>
        <nav className={headerStyles.navbar}>
        <NavLink 
          to='/' 
          className={
            ({ isActive }) =>
              isActive 
              ? `${headerStyles.constructor_active} pl-5 pr-5 pt-4 pb-4 text text_type_main-default` 
              : `${headerStyles.constructor} pl-5 pr-5 pt-4 pb-4 text text_type_main-default text_color_inactive`
          } 
        >
          <BurgerIcon type="secondary"/>
          <span className={`${headerStyles.span} ml-2`}>Конструктор</span>
        </NavLink>
        <NavLink 
          to='/feed' 
          className={
            ({ isActive }) =>
              isActive 
              ? `${headerStyles.order_feed_active} pl-5 pr-5 pt-4 pb-4 text text_type_main-default` 
              : `${headerStyles.order_feed} pl-5 pr-5 pt-4 pb-4 text text_type_main-default text_color_inactive`
          } 
        >
          <ListIcon type="secondary"/>
          <span className="ml-2">Лента заказов</span>
        </NavLink>
        </nav>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <NavLink 
          to='/profile/*' 
          className={
            ({ isActive }) =>
              isActive 
              ? `${headerStyles.account_link_active} pl-5 pr-5 pt-4 pb-4 text text_type_main-default` 
              : `${headerStyles.account_link} pl-5 pr-5 pt-4 pb-4 text text_type_main-default text_color_inactive`
          } 
        >
          <ProfileIcon type="secondary"/>
          <span className="ml-2">Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  )
}

export default AppHeader;