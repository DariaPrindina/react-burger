import { EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import forgotPasswordStyles from './forgot-password.module.css'

export const ForgotPassword = () => {
  return (
    <div className={forgotPasswordStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form>
        <EmailInput
          name={'email'}
          extraClass='mb-6'
          value={''}
          placeholder="Укажите e-mail"
        >
        </EmailInput>
      </form>
      <Button 
          htmlType="button" 
          type="primary" 
          size="medium" 
        >
        Восстановить
        </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link to='/login' className={forgotPasswordStyles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
