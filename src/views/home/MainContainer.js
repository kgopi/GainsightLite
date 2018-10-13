import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from "react-navigation";
import {displayName} from "../../../app.json";
import HomeToolbar from "./HomeToolbar";
import CTAList from "../CTA/CTAList";
import Timeline from "../activitytimeline/Timeline";
import {Sally} from "../sally/Sally";

const TabsStack = createMaterialTopTabNavigator({
    "Time Line":Timeline,
    "CTA":CTAList,
    "Sally": Sally
}, {
    tabBarPosition:'top',
    swipeEnabled:true,
    initialRouteName:"Time Line",
    lazy:true,
    optimizationsEnabled:true,
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
        }
    }
});


export class MainContainer extends Component {

    static router = TabsStack.router;

    render() {
      return (
        <View style={{flex:1}}>
            <HomeToolbar navigation={this.props.navigation}/>
            <View style={styles.mainContainer}>
                <TabsStack navigation={this.props.navigation}/>
            </View>
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