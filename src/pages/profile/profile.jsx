import { EmailInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import profileStyles from './profile.module.css'

export const Profile = () => {
  return (
    <div className={`${profileStyles.container} mt-30`}>
      <div className={profileStyles.nav_container}>
        <div className={profileStyles.container_section}>
          <nav className={profileStyles.nav}>
            <ul className={profileStyles.ul}>
              <li>
                <NavLink to='/profile' activeClassName={profileStyles.link_active} className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}>
                  Профиль
                </NavLink>
              </li>
              <li>
                <NavLink to='/profile/orders' activeClassName={profileStyles.link_active} className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}>
                  История заказов
                </NavLink>
              </li>
              <li>
                <NavLink to='' activeClassName={profileStyles.link_active} className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}>
                  Выход
                </NavLink>
              </li>
            </ul>
          </nav>
          <p className={`text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
        <form className={profileStyles.form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            value={undefined}
            name={'name'}
            errorText={'Ошибка'}
            error={false}
            size={'default'}
            extraClass="mb-6"
            onChange={undefined}
            icon={'EditIcon'}
          />
          <EmailInput
            name={'login'}
            extraClass='mb-6'
            value={''}
            icon={'EditIcon'}
          >
          </EmailInput>
          <Input
            name={'password'}
            extraClass='mb-6'
            errorText={'Ошибка'}
            error={false}
            value={undefined}
            icon={'EditIcon'}
            placeholder={'Пароль'}
            onChange={undefined}
            size={'default'}
          />
        </form>
      </div>
    </div>
  )
}
