import { EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import loginStyles from './login.module.css'

export const Login = () => {
  return (
    <div className={loginStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form>
        <EmailInput
          name={'email'}
          extraClass='mb-6'
          value={''}
        >
        </EmailInput>
        <PasswordInput
          name={'password'}
          extraClass='mb-6'
          value={''}
        />
      </form>
      <Button 
          htmlType="button" 
          type="primary" 
          size="medium" 
        >
        Войти
        </Button>
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
