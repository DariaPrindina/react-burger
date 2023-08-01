import { useDispatch, useSelector } from "react-redux"
import { useForm } from '../../components/hooks/useForm';
import { setUser } from '../../services/actions/user';
import { EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-edit.module.css'
import { Loader } from "../loader/loader";

export const ProfileEdit = () => {
  const dispatch = useDispatch()

  const {user} = useSelector(store => store.userReducer)

  const {values, handleChange, setValues} = useForm({
    name: user?.name,
    email: user?.email,
    password: ''
  })

  const submitFormUpdateUser = (evt) => {
    evt.preventDefault()
    dispatch(setUser(values.name, values.email, values.password))
    setValues({...values, password: ''})
  }

  const undoChanges = (evt) => {
    evt.preventDefault()
    setValues({...values, name: user?.name, email: user?.email, password: ''})
  }

  return (
    user
    ?
    <form onSubmit={submitFormUpdateUser} className={`${styles.form} mt-30`}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        value={values.name}
        name={'name'}
        errorText={'Ошибка'}
        error={false}
        size={'default'}
        extraClass="mb-6"
        onChange={handleChange}
        icon={'EditIcon'}
      />
      <EmailInput
        name={'email'}
        extraClass='mb-6'
        value={values.email}
        error={false}
        icon={'EditIcon'}
        onChange={handleChange}
      >
      </EmailInput>
      <Input
        name={'password'}
        extraClass='mb-6'
        errorText={'Ошибка'}
        error={false}
        value={values.password}
        icon={'EditIcon'}
        placeholder={'Пароль'}
        onChange={handleChange}
        size={'default'}
      />
      <div className={styles.buttons}>
        { values.name !== user.name || values.email !== user.email || values.password !== ''
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