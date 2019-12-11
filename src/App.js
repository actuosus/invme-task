/**
 * @flow
 */

import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import AppContainer from "./containers/AppContainer";

const { store } = configureStore();

type AppProps = {}

const App = (props: AppProps) => (
  <Provider store={store}>
    <AppContainer {...props} />
  </Provider>
);

export default App;
