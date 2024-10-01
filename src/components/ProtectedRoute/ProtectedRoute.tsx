import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children?: React.ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: TProtectedRouteProps) =>
  // const isAuthChecked = useSelector(isAuthCheckedSelector);
  // const user = useSelector(userDataSelector);
  // const location = useLocation();

  // if (!isAuthChecked) {
  // console.log('WAIT USER CHECKOUT')
  //   return <Preloader />;
  // }

  // if (!onlyUnAuth && !user) {
  // console.log('NAVIGATE FROM PAGE TO LOGIN')
  //   return <Navigate replace to={'/login'} state={{ from: {...location, background: location.state?.background, state: null}}} />;
  // }

  // if (onlyUnAuth && user) {
  // console.log('NAVIGATE FROM LOGIN TO INDEX')
  //   const from = location.state?.from || { pathname: '/' };
  //   const backgroundLocation = location.state?.from?background || null;
  //   return <Navigate replace to={from} state = {{background: backgroundLocation}} />;
  // }

  children;

export default ProtectedRoute;
