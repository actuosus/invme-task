/**
 * @flow
 */

import { createStore, combineReducers, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import eventReducer from "./events/reducer";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  events: eventReducer
});

const persistConfig = {
  key: "root",
  storage
};

export const configureStore = (initialState: any) => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancer = composeEnhancers();
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
};
