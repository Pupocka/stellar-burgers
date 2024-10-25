import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => {
          dispatch(setUser(res.user));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(setIsAuthChecked());
        });
    } else {
      dispatch(setIsAuthChecked());
    }
  }
);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setUser(null));
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
      throw error;
    }
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);
export const getUserOrders = createAsyncThunk(
  'user/userOrders',
  async () => await getOrdersApi()
);

type TUserState = {
  isAuthChecked: boolean;
  error?: string | null;
  loading: boolean;
  user: TUser | null;
  userOrders: TOrder[];
};

export const initialState: TUserState = {
  isAuthChecked: false,
  error: '',
  loading: false,
  user: null,
  userOrders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = false;
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state) => {
        state.error = '';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.loading = false;
      });
  },
  selectors: {
    userSelector: (state) => state.user,
    userOrdersSelector: (state) => state.userOrders,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  }
});
export const userReducer = userSlice.reducer;
export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { userSelector, userOrdersSelector, isAuthCheckedSelector } =
  userSlice.selectors;
