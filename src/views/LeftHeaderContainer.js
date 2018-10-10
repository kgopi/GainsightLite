import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class LeftHeaderContainer extends Component<Props> {
    render() {
      return (
        <View style={styles.leftContainer}>
            <Text style={styles.logoText}>Gainsight Lite</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  leftContainer: {
        alignItems: "flex-start",
        flexDirection: "row"
  },
    logoText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      alignItems: "flex-start",
      marginLeft: 10
    }
  });