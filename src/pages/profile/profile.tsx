import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import profileStyles from './profile.module.css'
import { logoutUser } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../services/hooks';
import { ProfileEdit } from '../../components/profile-edit/profile-edit';
import { ProfileOrders } from '../../components/profile-orders/profile-orders';

export const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const stor = useSelector(store => store)
  console.log("🚀 ~ file: profile.tsx:15 ~ Profile ~ stor:", stor)

  const logout = (evt: any): void => {
    evt.preventDefault()
    dispatch(logoutUser())
    navigate('/', { replace: true })
  }

  return (
    <div className={profileStyles.container}>
      <div className={profileStyles.nav_container}>
        <div className={`${profileStyles.container_section} mt-30`}>
          <nav className={profileStyles.nav}>
            <ul className={profileStyles.ul}>
              <li>
                <NavLink 
                  to={`/profile/*`}
                  className={({ isActive }) =>
                    isActive 
                    ? `${profileStyles.link_active} text text_type_main-medium` 
                    : `${profileStyles.link} text text_type_main-medium text_color_inactive`
                  } 
                >
                  Профиль
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={`/profile/orders`}
                  className={({ isActive }) =>
                    isActive 
                    ? `${profileStyles.link_active} text text_type_main-medium` 
                    : `${profileStyles.link} text text_type_main-medium text_color_inactive`
                  } 
                >
                  История заказов
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/'
                  onClick={logout}
                  className={({ isActive }) =>
                    isActive 
                    ? `${profileStyles.link_active} text text_type_main-medium` 
                    : `${profileStyles.link} text text_type_main-medium text_color_inactive`
                  } 
                >
                  Выход
                </NavLink>
              </li>
            </ul>
          </nav>
          <p className={`text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
      </div>
        {location.pathname === '/profile/*' && <ProfileEdit/>}
        {location.pathname === '/profile/orders' && <ProfileOrders/>}
    </div>
  )
}
