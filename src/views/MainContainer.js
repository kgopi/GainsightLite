import React, {Component} from 'react';
import ContentContainer from './ContentContainer';
import {StyleSheet, View} from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import {displayName} from "../../app.json";
import {createTabNavigator} from "react-navigation";
import Timeline from "./Timeline/Timeline";
import {CTAList} from "./CTA/CTAList";


const TabViewStack = createTabNavigator({
    "Time Line":Timeline,
    "CTA":CTAList,
    "CS360":Timeline
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



export class MainContainer extends Component<Props> {

    static navigationOptions = {
        header: <Toolbar
            leftElement="menu"
            centerElement={displayName}
            searchable={{
                autoFocus: true,
                placeholder: 'Search',
            }}
            rightElement={{
                menu: {
                    icon: "more-vert",
                    labels: ["item 1", "item 2"]
                }
            }}
            onRightElementPress={ (label) => { console.log(label) }}
        />
    };

    constructor(props) {
        super(props);  
    }

    render() {
      return (
        <View style={styles.mainContainer}>
            <TabViewStack/>
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