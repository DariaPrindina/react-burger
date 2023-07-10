import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import resetPasswordStyles from './reset-password.module.css'
import { resetPassword } from '../../services/actions/user';

export const ResetPassword = () => {
const userInfo = useSelector(store => store.userReducer.user)

const [password, setPassword] = useState('')
const [tokenPassword, setTokenPassword] = useState('')
const dispatch = useDispatch()

const enterPasswordValue = (evt) => {
  setPassword(evt.target.value)
}

const enterCodeValue = (evt) => {
  setTokenPassword(evt.target.value)
}

const submitFormResetPassword = (evt) => {
  evt.preventDefault()
  dispatch(resetPassword(password, tokenPassword))
}

  return (
    <div className={resetPasswordStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form onSubmit={submitFormResetPassword} className={resetPasswordStyles.form}>
        <PasswordInput
          name={'password'}
          extraClass='mb-6'
          value={password}
          placeholder="Введите новый пароль"
          onChange={enterPasswordValue}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          value={tokenPassword}
          name={'tokenPassword'}
          errorText={'Ошибка'}
          error={false}
          size={'default'}
          extraClass="mb-6"
          onChange={enterCodeValue}
        />
        <Button 
          htmlType="submit" 
          type="primary" 
          size="medium" 
        >
        Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link to='/login' className={resetPasswordStyles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
