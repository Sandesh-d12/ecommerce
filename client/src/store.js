import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import productSlice from "./reducers/productSlice";
import cartSlice from "./reducers/cartSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
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
import orderSlice from "./reducers/orderSlice";
import { logger } from "redux-logger";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";

//FOR REDUCER
const persistConfig = {
  key: "customers",
  key1: "product",
  key2: "cart",
  storage,
  blacklist: ["user", "customers", "cart"],
};
const reducers = combineReducers({
  user: persistReducer(
    {
      key: "user",
      storage: storage,
    },
    userSlice
  ),
  product: persistReducer(
    {
      key: "product",
      storage: storage,
    },
    productSlice
  ),
  cart: persistReducer(
    {
      key: "cart",
      storage: storage,
      blacklist: ["status", "loading"],
    },
    cartSlice
  ),
  Order: persistReducer(
    {
      key: "Order",
      storage: storage,
      blacklist: ["status"],
    },
    orderSlice
  ),
});
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore(
  {
    reducer: persistedReducer,
    // middleware: getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  },

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
export default store;
