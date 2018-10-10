import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class RightHeaderContainer extends Component<Props> {
    render() {
      return (
        <View style={styles.container}>
            <Icon name="search" color='#fff' size={23} style={{padding:5}} />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-end",
        flexDirection: "row"
    }
  });