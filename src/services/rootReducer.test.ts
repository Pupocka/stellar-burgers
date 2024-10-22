import { burgerConstructorReducer } from "./slices/burgerConstructor/burgerConstructorSlice";
import { feedReducer } from "./slices/feed/feedSlice";
import { ingredientsReducer } from "./slices/ingredients/ingredientsSlice";
import { userReducer } from "./slices/user/userSlice";
import { rootReducer } from "./store";

describe('rootReducer', () => {
    test('should combine all slice reducers correctly', () => {
        const initialAction = { type: '@@INIT' };
        const state =   rootReducer(undefined, initialAction);
        expect(state).toEqual({
            ingredientsReducer,
            burgerConstructorReducer,
            feedReducer,
            userReducer 
        });
    });
});