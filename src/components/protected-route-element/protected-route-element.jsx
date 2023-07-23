import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRouteElement = ({ element, onlyUnAuth = false }) => {
  const location = useLocation()
  const {authentification} = useSelector(store => store.userReducer)

  if (onlyUnAuth && authentification) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  if (!authentification && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return element
} 