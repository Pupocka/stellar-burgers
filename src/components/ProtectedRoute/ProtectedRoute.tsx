import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth }: TProtectedRouteProps) =>
  // const isAuthChecked = useSelector(isAuthCheckedSelector);
  // const user = useSelector(userDataSelector);
  // const location = useLocation();

  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  // if (!onlyUnAuth && !user) {
  //   return <Navigate replace to='/login' state={{ from: location }}/>;
  // }

  // if (onlyUnAuth && user) {
  //   const from = location.state?.from || { pathname: '/' };
  //   return <Navigate replace to={from} />;
  // }

  null;

export default ProtectedRoute;
