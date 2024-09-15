import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/slice';

import { authReducer } from './auth/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { filterReducer } from './filters/slice';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

type InitialState = {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

const authPersistConfig: PersistConfig<InitialState> = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filterReducer,
    auth: persistReducer<InitialState>(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
