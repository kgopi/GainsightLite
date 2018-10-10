import React, {Component} from 'react';
import LeftHeaderContainer from './LeftHeaderContainer';
import RightHeaderContainer from './RightHeaderContainer';
import {StyleSheet, View} from 'react-native';

export default class HeaderContainer extends Component<Props> {
    render() {
      return (
        <View style={styles.headerContainer}>
            <LeftHeaderContainer title={this.props.title}></LeftHeaderContainer>
            <RightHeaderContainer></RightHeaderContainer>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#558dfd",
        alignItems:"center",
        paddingRight: 5
    }
  });