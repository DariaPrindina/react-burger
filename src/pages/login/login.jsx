import { EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import loginStyles from './login.module.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginUser } from '../../services/actions/user';

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const enterEmailValue = (evt) => {
    setEmail(evt.target.value)
  }
  const enterPasswordValue = (evt) => {
    setPassword(evt.target.value)
  }

  const submitFormRegister = (evt) => {
    evt.preventDefault()
    dispatch(loginUser(email, password))
    navigate('/', { replace: true })
  }

  return (
    <div className={loginStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form onSubmit={submitFormRegister} className={loginStyles.form}>
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
        Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?&nbsp;
        <Link to='/register' className={loginStyles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?&nbsp;
        <Link to='/forgot-password' className={loginStyles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  )
}
