import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorSelector,
  orderBurger,
  orderModalDataSelector,
  orderRequestSelector,
  setOrderModalData
} from '../../services/slices/burgerConstructor/burgerConstructorSlice';
import { userSelector } from '../../services/slices/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(burgerConstructorSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderModalDataSelector);
  const user = useSelector(userSelector);

  const stringBurger = (
    bunId: string,
    ingredients: TConstructorIngredient[]
  ): string[] => [
    bunId,
    ...ingredients.map((ingredient) => ingredient._id),
    bunId
  ];

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      dispatch(
        orderBurger(
          stringBurger(constructorItems.bun!._id, constructorItems.ingredients)
        )
      );
    } else {
      navigate('/login', { state: { from: '/' } });
    }
  };
  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun?.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
