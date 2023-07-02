import { PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import resetPasswordStyles from './reset-password.module.css'

export const ResetPassword = () => {
  return (
    <div className={resetPasswordStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form>
        <PasswordInput
          name={'password'}
          extraClass='mb-6'
          value={''}
          placeholder="Введите новый пароль"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          value={''}
          name={'code'}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
      </form>
      <Button 
          htmlType="button" 
          type="primary" 
          size="medium" 
        >
        Сохранить
        </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link to='/login' className={resetPasswordStyles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
