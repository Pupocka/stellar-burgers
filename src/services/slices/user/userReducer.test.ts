import {
  getUser,
  getUserOrders,
  initialState,
  loginUser,
  registerUser,
  setIsAuthChecked,
  setUser,
  updateUser,
  userReducer
} from './userSlice';

const userSample = {
  email: 'test@mail.ru',
  name: 'TestUser'
};

const ordersSample = [
  {
    _id: '1',
    status: 'ready',
    name: 'order',
    createdAt: 'date',
    updatedAt: 'date',
    number: 1234,
    ingredients: ['1', '2', '3', '4']
  },
  {
    _id: '2',
    status: 'ready',
    name: 'order',
    createdAt: 'date',
    updatedAt: 'date',
    number: 5678,
    ingredients: ['5', '6', '7', '8']
  }
];

describe('Тесты экшенов пользователя', () => {
  test('setUser', () => {
    const action = setUser(userSample);
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, user: userSample });
  });
  test('setIsAuthChecked', () => {
    const action = setIsAuthChecked();
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });
});

describe('Тесты getUser extraReducers', () => {
  test('getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: false
    });
  });
  test('getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
  test('getUser.rejected', () => {
    const action = { type: getUser.rejected.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: false
    });
  });
});

describe('Тесты registerUser extraReducers', () => {
  test('registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: false });
  });
  test('registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: userSample }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userSample,
      isAuthChecked: true
    });
  });
  test('registerUser.rejected', () => {
    const error = new Error('Ошибка');
    const action = { type: registerUser.rejected.type, error };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: error.message,
      isAuthChecked: true
    });
  });
});

describe('Тесты loginUser extraReducers', () => {
  test('loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: userSample }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userSample,
      loading: false,
      isAuthChecked: true
    });
  });
  test('loginUser.rejected', () => {
    const error = new Error('Ошибка');
    const action = { type: loginUser.rejected.type, error };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: error.message,
      loading: false,
      isAuthChecked: true
    });
  });
});

describe('Тесты updateUser extraReducers', () => {
  test('updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: userSample }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: userSample
    });
  });
  test('updateUser.rejected', () => {
    const error = new Error('Ошибка');
    const action = { type: updateUser.rejected.type, error };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: error.message,
      loading: false
    });
  });
});

describe('Тесты getUserOrders extraReducers', () => {
  test('getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('getUserOrders.fulfilled', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: ordersSample
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userOrders: ordersSample,
      loading: false
    });
  });
  test('getUserOrders.rejected', () => {
    const error = new Error('Ошибка');
    const action = { type: getUserOrders.rejected.type, error };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: error.message,
      loading: false
    });
  });
});
