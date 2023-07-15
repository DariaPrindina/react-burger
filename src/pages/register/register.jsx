import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import registerStyles from './register.module.css'
import { registrationUser } from '../../services/actions/user';

export const Register = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const stor = useSelector(store => store.userReducer.user)
  
  const enterNameValue = (evt) => {
    setName(evt.target.value)
  }
  const enterEmailValue = (evt) => {
    setEmail(evt.target.value)
  }
  const enterPasswordValue = (evt) => {
    setPassword(evt.target.value)
  }

  const submitFormRegister = (evt) => {
    evt.preventDefault()
    dispatch(registrationUser(name, email, password))
  }

  return (
    <div className={registerStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Регистрация</h1>
      <form onSubmit={submitFormRegister} className={registerStyles.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
          value={name}
          onChange={enterNameValue}
        >
        </Input>
        <EmailInput
          name={'email'}
          extraClass='mb-6'
          value={email}
          onChange={enterEmailValue}
        >
        </EmailInput>
        <PasswordInput
          name={'password'}
          extraClass='mb-6'
          value={password}
          onChange={enterPasswordValue}
        />
        <Button 
          htmlType="submit" 
          type="primary" 
          size="medium" 
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?&nbsp;
        <Link to='/login' className={registerStyles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
