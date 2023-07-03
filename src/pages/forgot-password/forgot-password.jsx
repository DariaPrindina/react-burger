import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import forgotPasswordStyles from './forgot-password.module.css'
import { forgotPassword } from '../../services/actions/user';

export const ForgotPassword = () => {
const [email, setEmail] = useState('')
const dispatch = useDispatch()

const enterEmailValue = (evt) => {
  setEmail(evt.target.value)
}

const submitEmail = (evt) => {
  evt.preventDefault()
  dispatch(forgotPassword(email))
  setEmail('')
}

  return (
    <div className={forgotPasswordStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form onSubmit={submitEmail} className={forgotPasswordStyles.form}>
        <EmailInput
          extraClass='mb-6'
          value={email}
          name={'email'}
          onChange={enterEmailValue}
          placeholder="Укажите e-mail"
        >
        </EmailInput>
        <Button 
          htmlType="submit" 
          type="primary" 
          size="medium" 
        >
        Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link to='/login' className={forgotPasswordStyles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
