import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';

import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,

}

const cartPersistedReducer = persistReducer(persistConfig, cartReducer);
const authPersistedReducer = persistReducer(persistConfig, authReducer);
const orderPersistedReducer = persistReducer(persistConfig, orderReducer);

 const store = configureStore({
  reducer: {
    cart:cartPersistedReducer,
    auth:authPersistedReducer,
    order:orderPersistedReducer,
  },
  middleware: [
    createStateSyncMiddleware({
      blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
    })
  ]
})
// initMessageListener(store);
export let persistor = persistStore(store);
export default store



  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),createStateSyncMiddleware(),
