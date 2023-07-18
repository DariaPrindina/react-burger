import notFoundStyles from './not-found.module.css'
import { Link, useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className={notFoundStyles.container}>
      <p className={`${notFoundStyles.number} text text_type_digits-large mb-5`}>
        404
      </p>
      <p className='text text_type_main-medium mb-30'>
        Такой страницы не существует
      </p>
      <p>
        <Link onClick={goBack} className={`${notFoundStyles.link} text text_type_main-default`}>
          Вернуться назад
        </Link>
      </p>
      
    </div>
  )
}