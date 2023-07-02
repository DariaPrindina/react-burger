import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import registerStyles from './register.module.css'

export const Register = () => {
  return (
    <div className={registerStyles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>Регистрация</h1>
      <form>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
          value={''}
        >
        </Input>
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
        Зарегистрироваться
        </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?&nbsp;
        <Link to='/login' className={registerStyles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
