import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error?: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { getIngredientsSelector } = ingredientsSlice.selectors;
