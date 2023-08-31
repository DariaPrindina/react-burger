import { useDispatch, useSelector } from "../../services/hooks"
import { setUser } from '../../services/actions/user';
import { EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-edit.module.css'
import { Loader } from "../loader/loader";
import { useState, ChangeEvent, FormEvent } from "react";

export const ProfileEdit = () => {
  const dispatch = useDispatch()

  const user = useSelector(store => store.userReducer.user)

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState('')
  
  const enterNameValue = (evt: ChangeEvent<HTMLInputElement>): void => {
    setName(evt.target.value)
  }
  const enterEmailValue = (evt: ChangeEvent<HTMLInputElement>): void => {
    setEmail(evt.target.value)
  }
  const enterPasswordValue = (evt: ChangeEvent<HTMLInputElement>): void => {
    setPassword(evt.target.value)
  }

  const submitFormUpdateUser = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault()
    dispatch(setUser(name, email, password))
    setPassword('')
  }

  const undoChanges = () => {
    setName(user?.name)
    setEmail(user?.email)
    setPassword('')
  }

  return (
    user
    ?
    <form onSubmit={submitFormUpdateUser} className={`${styles.form} mt-30`}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        value={name ? name : ''}
        name={'name'}
        errorText={'Ошибка'}
        error={false}
        size={'default'}
        extraClass="mb-6"
        onChange={enterNameValue}
        icon={'EditIcon'}
      />
      <EmailInput
        name={'email'}
        extraClass='mb-6'
        value={email ? email : ''}
        isIcon={true}
        onChange={enterEmailValue}
      >
      </EmailInput>
      <Input
        name={'password'}
        extraClass='mb-6'
        errorText={'Ошибка'}
        error={false}
        value={password}
        icon={'EditIcon'}
        placeholder={'Пароль'}
        onChange={enterPasswordValue}
        size={'default'}
      />
      <div className={styles.buttons}>
        { name !== user?.name || email !== user?.email || password !== ''
        ?
        <>
          <Button 
            htmlType="submit"
            type="primary" 
            size="small" 
          >
            Сохранить
          </Button>
          <Button 
            htmlType="button" 
            type="primary" 
            size="small" 
            onClick={undoChanges}
          >
            Oтмена
          </Button>
        </>
        : <></>
        }
      </div>
    </form> 
    : <Loader/>
  )
}