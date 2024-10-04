import { orderBurgerApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

export const getOrderByNumber = createAsyncThunk(
  'burgerConstructor/getOrderByNumber',
  async (data) => getOrderByNumberApi(data)
);

export const orderBurger = createAsyncThunk(
  'burgerConstructor/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

type TBurgerConstructorState = {
  constructorItems: {
    bun?: {
      price: number;
      _id: string;
    };
    ingredients: Array<TIngredient>;
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderByNumber?: TOrder | null;
};
const initialState: TBurgerConstructorState = {
  constructorItems: {
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.ingredients = state.constructorItems.ingredients.filter(
        (item) => item._id !== action.payload._id
      );
    }
  },
  selectors: {
    burgerConstructorSelector: (state) => state.constructorItems
  }
});
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export const { burgerConstructorSelector } = burgerConstructorSlice.selectors;
function getOrderByNumberApi(data: void): any {
  throw new Error('Function not implemented.');
}

