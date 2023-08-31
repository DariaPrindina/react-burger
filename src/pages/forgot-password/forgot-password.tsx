import React from 'react'
import { useDispatch } from '../../services/hooks'
import { EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import forgotPasswordStyles from './forgot-password.module.css'
import { forgotPassword } from '../../services/actions/user';
import { useForm } from '../../components/hooks/useForm';

export const ForgotPassword = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

const {values, handleChange } = useForm({
  email: '',
})

const submitEmail = (evt: any): void => {
  evt.preventDefault()
  dispatch(forgotPassword(values.email))
  navigate('/reset-password', { replace: true })
}

  return (
    <div className={forgotPasswordStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form onSubmit={submitEmail} className={forgotPasswordStyles.form}>
        <EmailInput
          extraClass='mb-6'
          value={values.email as string}
          name={'email'}
          onChange={handleChange}
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
