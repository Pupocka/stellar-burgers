import { TIngredient, TOrder } from '../../../utils/types';
import {
  addIngredient,
  burgerConstructorReducer,
  getOrderByNumber,
  initialState,
  moveDown,
  moveUp,
  orderBurger,
  removeIngredient,
  setOrderModalData,
  TBurgerConstructorState
} from './burgerConstructorSlice';

const orderSample: TOrder = {
  _id: '1',
  status: 'ready',
  name: 'order',
  createdAt: 'date',
  updatedAt: 'date',
  number: 1234,
  ingredients: ['1', '2', '3', '4']
};

describe('Тесты экшенов конструктора бургера', () => {
  const initialState: TBurgerConstructorState = {
    constructorItems: {
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('Добавление продукта', () => {
    const ingredient: TIngredient = {
      _id: '1',
      name: 'Соус',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    };

    const action = addIngredient(ingredient);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.constructorItems.ingredients[0]).toEqual(
      expect.objectContaining(ingredient)
    );
  });
  test('Удаление продукта', () => {
    const initialState: TBurgerConstructorState = {
      constructorItems: {
        ingredients: [
          {
            id: '1',
            _id: '1',
            name: 'Соус',
            type: 'sauce',
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-01-large.png'
          }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const action = removeIngredient(0);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.constructorItems.ingredients.length).toBe(0);
  });
});

describe('Изменение порядка', () => {
  const initialState: TBurgerConstructorState = {
    constructorItems: {
      ingredients: [
        {
          id: '1',
          _id: '1',
          name: 'Соус',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-01-large.png'
        },
        {
          id: '2',
          _id: '2',
          name: 'Биокотлета',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ]
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };
  test('Установить порядок модальных данных', () => {
    const action = setOrderModalData(orderSample);
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      orderModalData: orderSample
    });
  });
  test('Правильное перемещение элемента вверх', () => {
    const action = moveUp(1);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[1].id).toBe('1');
  });
  test('Правильное перемещение элемента вниз', () => {
    const action = moveDown(0);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[1].id).toBe('1');
  });
});

describe('Тесты orderBurger extraReducers', () => {
  test('orderBurger.pending', () => {
    const action = { type: orderBurger.pending.type };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: true });
  });
  test('orderBurger.fulfilled', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: { order: orderSample }
    };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderModalData: orderSample,
      constructorItems: {
        bun: undefined,
        ingredients: []
      }
    });
  });
  test('orderBurger.rejected', () => {
    const action = {
      type: orderBurger.rejected.type
    };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: false });
  });
});

describe(' Тесты getOrderByNumber extraReducers', () => {
  test('getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual({
      constructorItems: { ingredients: [] },
      error: null,
      orderByNumber: null,
      orderModalData: null,
      orderRequest: false
    });
  });
  test('getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [orderSample] }
    };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderByNumber: orderSample,
      orderModalData: null
    });
  });
  test('getOrderByNumber.rejected', () => {
    const error = new Error('Ошибка');
    const action = {
      type: getOrderByNumber.rejected.type,
      error
    };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: error.message });
  });
});
