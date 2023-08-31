import { useSelector } from '../../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '../loader/loader';
import { FC } from 'react';
import { TProtectedRoute } from '../../services/types/data';

export const ProtectedRouteElement: FC<TProtectedRoute> = ({ element, onlyUnAuth = false }) => {
  const location = useLocation()
  const {isAuthChecked, authentification} = useSelector(store => store.userReducer)

  if (!isAuthChecked) {
    return <Loader/>
  }

  if (onlyUnAuth && authentification) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  if (!authentification && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return element
} 