import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {goToHome} from "../../actions/timeline";

class LeftHeaderContainer extends Component<Props> {
    render() {
      return (
        <View style={styles.leftContainer}>
            {
              this.props.isDetailView && 
                (<View>
                  <Icon name="arrow-back" color='#fff' size={23} onPress={() => this.props.goToHome()} />
                </View>)
            }
            <Text style={styles.logoText}>{this.props.title}</Text>
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

  const mapStateToProps = state => {
    return {
        title: state.app.title,
        isDetailView: state.app.isDetailView
    }
  }

  const mapDispatchersToProps = dispatch => {
    return {
        goToHome: () => {
            dispatch(goToHome());
        }
    }
}
  
  export default connect(mapStateToProps, mapDispatchersToProps)(LeftHeaderContainer)