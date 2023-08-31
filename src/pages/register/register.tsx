import { useState } from 'react';
import { useDispatch } from '../../services/hooks';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import registerStyles from './register.module.css'
import { registrationUser } from '../../services/actions/user';

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const enterNameValue = (evt: any): void => {
    setName(evt.target.value)
  }
  const enterEmailValue = (evt: any): void => {
    setEmail(evt.target.value)
  }
  const enterPasswordValue = (evt: any): void => {
    setPassword(evt.target.value)
  }

  const submitFormRegister = (evt: any): void => {
    evt.preventDefault()
    dispatch(registrationUser(name, email, password))
    navigate('/login', {replace: true})
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
