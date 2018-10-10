import React, {Component} from 'react';
import HeaderContainer from './HeadContainer';
import ContentContainer from './ContentContainer';
import {StyleSheet, View} from 'react-native';

export default class MainContainer extends Component<Props> {

    state = {
        title: "Gainsight Lite",
        isDetailView: false,
        selectedActivity: null
    }

    constructor(props) {
        super(props);  
    }

    render() {
      return (
        <View style={styles.mainContainer}>
            <HeaderContainer state={this.state}></HeaderContainer>
            <ContentContainer state={this.state} onDetailView={this.onDetailView}></ContentContainer>
        </View>
      );
    }

    onDetailView = ({title, selectedItem}) => {
        debugger;
        this.setState({title, isDetailView:true, selectedActivity: selectedItem});
    }
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
      height: 24
    }
  });