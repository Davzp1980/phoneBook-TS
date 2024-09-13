import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { string } from 'yup';
import { RootState } from '../store';

axios.defaults.baseURL = 'https://connections-api.goit.global';

type Credentials = {
  name: string;
  email: string;
  password: string;
};
type Response = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};
// Utility to add JWT
const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk<Response, Credentials>(
  'auth/register',
  async (credentials: Credentials, thunkAPI) => {
    try {
      const { data } = await axios.post<Response>('/users/signup', credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(data.token);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk<Response, Credentials>(
  'auth/login',
  async (credentials: Credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      // After successful login, add the token to the HTTP header
      setAuthHeader(data.token);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk<
  Credentials,
  void,
  { state: RootState }
>('auth/refresh', async (_, thunkAPI) => {
  // Reading the token from the state via getState()
  const state = thunkAPI.getState();
  const persistedToken: string | null = state.auth.token;

  if (persistedToken === null) {
    // If there is no token, exit without performing any request
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    // If there is a token, add it to the HTTP header and perform the request
    setAuthHeader(persistedToken);
    const res = await axios.get<Credentials>('/users/current');
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
