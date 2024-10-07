import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  userOrdersSelector
} from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(userOrdersSelector);
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
