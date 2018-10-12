import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from "react-navigation";
import {displayName} from "../../../app.json";
import {HomeToolbar} from "./HomeToolbar";
import {CTAList} from "../calltoaction/CTAList";
import Timeline from "../activitytimeline/Timeline";

const TabsStack = createMaterialTopTabNavigator({
    "Time Line":Timeline,
    "CTA":CTAList/*,
            "CS360":Timeline*/
}, {
    tabBarPosition:'top',
    swipeEnabled:true,
    initialRouteName:"Time Line",
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
        }
    }
});


export class MainContainer extends Component {

    static navigationOptions = {
        header: <HomeToolbar />
    };

    static router = TabsStack.router;

    render() {
      return (
        <View style={styles.mainContainer}>
            <TabsStack navigation={this.props.navigation}/>
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