

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './userReducer';
import ConverReducer from "./ConverReducer";
import ballonsReducer from './ballonsReducer'
import historyReducer from "./History";
import modalReducer from "./modalReducer";
import loading  from "./loading";
import comments from "./comment";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({user  :userReducer,conver : ConverReducer,ballons : ballonsReducer ,history : historyReducer
  , modal : modalReducer,loading : loading, comments : comments});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store);