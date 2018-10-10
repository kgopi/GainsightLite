
import React, {Component} from 'react';
import {Platform} from 'react-native';
import MainContainer from './src/views/MainContainer';
//import {configurePushNotifications} from './PushNotifications';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <MainContainer></MainContainer>
    );
  }
}

//configurePushNotifications();
