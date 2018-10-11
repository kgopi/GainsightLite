import React, {Component} from 'react';
import HeaderContainer from './HeadContainer';
import ContentContainer from './ContentContainer';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import { changeAppTitle } from './../actions/app';

export class MainContainer extends Component<Props> {

    constructor(props) {
        super(props);  
    }

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
      display:'flex',
      flexDirection:'column',
      backgroundColor: '#fff',
      height:'100%'
    }
  });