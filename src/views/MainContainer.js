import React, {Component} from 'react';
import HeaderContainer from './HeadContainer';
import ContentContainer from './ContentContainer';
import {StyleSheet, View} from 'react-native';

export default class MainContainer extends Component<Props> {
    render() {
      return (
        <View style={styles.mainContainer}>
            <HeaderContainer></HeaderContainer>
            <ContentContainer></ContentContainer>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
      height: 24
    }
  });