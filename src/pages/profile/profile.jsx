import { EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import profileStyles from './profile.module.css'
import { logoutUser, setUser } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../services/actions/user';

export const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector(store => store.userReducer)
  const {authentification} = useSelector(store => store.userReducer)

  const [nameNew, setNameNew] = useState(authentification ? user?.name : '')
  const [emailNew, setEmailNew] = useState(authentification ? user?.email : '')
  const [passwordNew, setPasswordNew] = useState('')

  const enterNameNewValue = (evt) => {
    setNameNew(evt.target.value)
  }
  const enterEmailNewValue = (evt) => {
    setEmailNew(evt.target.value)
  }
  const enterPasswordNewValue = (evt) => {
    setPasswordNew(evt.target.value)
  }

  const submitFormUpdateUser = (evt) => {
    evt.preventDefault()
    dispatch(setUser(nameNew, emailNew, passwordNew))
  }

  const undoChanges = (evt) => {
    evt.preventDefault()
    setNameNew(user?.name)
    setEmailNew(user?.email)
    setPasswordNew('')
  }

  const logout = (evt) => {
    evt.preventDefault()
    dispatch(logoutUser())
    navigate('/', { replace: true })
  }

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <div className={`${profileStyles.container} mt-30`}>
      <div className={profileStyles.nav_container}>
        <div className={profileStyles.container_section}>
          <nav className={profileStyles.nav}>
            <ul className={profileStyles.ul}>
              <li>
                <NavLink 
                  to='/profile'
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
                  to='/profile/orders' 
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
        <form onSubmit={submitFormUpdateUser} className={profileStyles.form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            value={nameNew}
            name={'name'}
            errorText={'Ошибка'}
            error={false}
            size={'default'}
            extraClass="mb-6"
            onChange={enterNameNewValue}
            icon={'EditIcon'}
          />
          <EmailInput
            name={'login'}
            extraClass='mb-6'
            value={emailNew}
            error={false}
            icon={'EditIcon'}
            onChange={enterEmailNewValue}
          >
          </EmailInput>
          <Input
            name={'password'}
            extraClass='mb-6'
            errorText={'Ошибка'}
            error={false}
            value={passwordNew}
            icon={'EditIcon'}
            placeholder={'Пароль'}
            onChange={enterPasswordNewValue}
            size={'default'}
          />
          <div className={profileStyles.buttons}>
            <Button 
              htmlType="submit"
              type="primary" 
              size="small" 
            >
			  			Сохранить
			  		</Button>
            <Button 
              htmlType="button" 
              type="primary" 
              size="small" 
              onClick={undoChanges}
            >
			  			Oтмена
			  		</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
