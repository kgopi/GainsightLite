import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class LeftHeaderContainer extends Component<Props> {
    render() {
      return (
        <View style={styles.leftContainer}>
            {
              this.props.state.isDetailView && 
                (<View>
                  <Icon name="arrow-back" color='#fff' size={23} />
                </View>)
            }
            <Text style={styles.logoText}>{this.props.state.title}</Text>
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