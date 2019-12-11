/**
 * @flow
 */

import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import AppContainer from "./containers/AppContainer";

const { store } = configureStore();

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
