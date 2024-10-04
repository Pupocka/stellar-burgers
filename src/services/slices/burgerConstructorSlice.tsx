import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  ingredients: Array<TIngredient>;
};
const initialState: TBurgerConstructorState = {
  ingredients: []
};
export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload._id
      );
    }
  },
  selectors: {
    burgerConstructorSelector: (state) => state
  }
});
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export const { burgerConstructorSelector } = burgerConstructorSlice.selectors;
