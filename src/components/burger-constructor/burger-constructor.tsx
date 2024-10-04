import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { burgerConstructorSelector } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(burgerConstructorSelector);
  // const constructorItems = {
  //   bun: burgerConstructor.constructorItems.ingredients
  //     .filter((item) => item.type === 'bun')
  //     .pop(),
  //   ingredients: burgerConstructor.ingredients.filter(
  //     (item) => item.type !== 'bun'
  //   )
  // };

  const orderRequest = false;

  const orderModalData = null;
  const stringBurger = (
    bunId: string,
    ingredients: TConstructorIngredient[]
  ) => {
    let result: string[];
    const arr: string[] = ingredients.map((ingredient) => ingredient._id);
    return (result = [bunId, ...arr, bunId]);
  };
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TIngredient) => sum + ingredient.price,
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
