import { TIngredient } from '../../../utils/types';
import {
  getIngredients,
  ingredientsReducer,
  initialState
} from './ingredientsSlice';

const ingredientsSample: TIngredient[] = [
  {
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
  },
  {
    _id: '2',
    name: 'Биокотлета',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('Тесты getIngredients extraReducers', () => {
  test('getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredientsSample
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: ingredientsSample,
      loading: false
    });
  });
  test('getIngredients.rejected', () => {
    const action = { type: getIngredients.rejected.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: false });
  });
});
