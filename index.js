/** @format */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import App from './app/App';
import configureStore from './app/redux/configure-store';
import React from 'react';

const store = configureStore();

const Main = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Main);
