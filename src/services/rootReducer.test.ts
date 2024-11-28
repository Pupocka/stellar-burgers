import { burgerConstructorReducer } from './slices/burgerConstructor/burgerConstructorSlice';
import { feedReducer } from './slices/feed/feedSlice';
import { ingredientsReducer } from './slices/ingredients/ingredientsSlice';
import { userReducer } from './slices/user/userSlice';
import store, { RootState } from './store';

describe('rootReducer', () => {
  it('возвращает корректное начальное состояние хранилища', () => {
    const initialState: RootState = store.getState();

    expect(initialState.burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(initialState.feed).toEqual(
      feedReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(initialState.ingredients).toEqual(
      ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(initialState.user).toEqual(
      userReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
