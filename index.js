/** @format */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import configureStore from './src/Store';
import {Provider} from 'react-redux';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.blue800,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
          <App />
      </ThemeContext.Provider>
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);