import { EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import loginStyles from './login.module.css'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/actions/user';
import { useForm } from '../../components/hooks/useForm';

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {values, handleChange} = useForm({
    email: '',
    password: ''
  })

  const submitFormRegister = (evt) => {
    evt.preventDefault()
    dispatch(loginUser(values.email, values.password))
    navigate('/', { replace: true })
  }

  return (
    <div className={loginStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form onSubmit={submitFormRegister} className={loginStyles.form}>
        <EmailInput
          name={'email'}
          extraClass='mb-6'
          value={values.email}
          onChange={handleChange}
        >
        </EmailInput>
        <PasswordInput
          name={'password'}
          extraClass='mb-6'
          value={values.password}
          onChange={handleChange}
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
