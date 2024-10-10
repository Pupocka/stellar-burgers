import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getFeed = createAsyncThunk('feed/getAll', async () =>
  getFeedsApi()
);
const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(
        getFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(getFeed.rejected, () => {
        console.log('err');
      });
  },
  selectors: {
    feedSelector: (state) => state
  }
});
export const feedReducer = feedSlice.reducer;
export const { feedSelector } = feedSlice.selectors;
