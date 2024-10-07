import { getOrderByNumberApi, orderBurgerApi } from '@api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const getOrderByNumber = createAsyncThunk(
  'burgerConstructor/getOrderByNumber',
  async (data: number) => getOrderByNumberApi(data)
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
    ingredients: Array<TConstructorIngredient>;
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderByNumber?: TOrder | null;
  error?: string | null;
};
const initialState: TBurgerConstructorState = {
  constructorItems: {
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    },
    moveDown: (
      state: TBurgerConstructorState,
      action: PayloadAction<number>
    ) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },

    moveUp: (state: TBurgerConstructorState, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: undefined,
          ingredients: []
        };
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderByNumber = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
  selectors: {
    burgerConstructorSelector: (state) => state.constructorItems,
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    orderByNumberSelector: (state) => state.orderByNumber
  }
});
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  setOrderModalData
} = burgerConstructorSlice.actions;
export const {
  burgerConstructorSelector,
  orderRequestSelector,
  orderModalDataSelector,
  orderByNumberSelector
} = burgerConstructorSlice.selectors;
