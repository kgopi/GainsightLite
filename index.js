/** @format */

global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData

fetch // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader
}

import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import store from './src/Store';
import {Provider} from 'react-redux';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import {PushNotificationControl} from "./src/views/notifications/NotificationController";

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {

        primaryColor: COLOR.blue800,
    },
    toolbar: {
        container: {
            height:Platform.OS==="ios"?60:70,
            paddingTop: Platform.OS==="ios"?10:20
        }
    },
    drawerHeader:{
        contentContainer:{
            backgroundColor: COLOR.grey500
        }
    }
};

const RNRedux = () => (
  <Provider store = { store }>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
          <App />
          <PushNotificationControl/>
      </ThemeContext.Provider>
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);