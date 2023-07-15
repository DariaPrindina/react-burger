import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteElement = ({ element, location }) => {

  const {authentification} = useSelector(store => store.userReducer)

  if (!authentification) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return element
} 