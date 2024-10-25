import { TOrder, TOrdersData } from '../../../utils/types';
import { feedReducer, getFeed, initialState } from './feedSlice';

const feedSample: TOrdersData = {
  orders: [],
  total: 1,
  totalToday: 1
};

describe('Тесты feedReducer extraReducers', () => {
  test('getFeed.fulfilled', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: feedSample
    };
    const state = feedReducer(initialState, action);

    expect(state.orders).toEqual(feedSample.orders);
    expect(state.total).toBe(feedSample.total);
    expect(state.totalToday).toBe(feedSample.totalToday);
  });
  test('getOrderByNumber.rejected', () => {
    const action = {
      type: getFeed.rejected.type
    };
    const state = feedReducer(initialState, action);

    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });
});
