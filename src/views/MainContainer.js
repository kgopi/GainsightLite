import React, {Component} from 'react';
import HeaderContainer from './HeadContainer';
import ContentContainer from './ContentContainer';
import {StyleSheet, View} from 'react-native';

export default class MainContainer extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            title: "Timeline",
            selected: 0
        }  
    }

    render() {
      return (
        <View style={styles.mainContainer}>
            <HeaderContainer title={this.state.title}></HeaderContainer>
            <ContentContainer onChangeTab={this.onChangeTab}></ContentContainer>
        </View>
      );
    }

    onChangeTab = (index) => {
        debugger;
        this.setState({selected: index.i, title: index});
    }
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
      height: 24
    }
  });