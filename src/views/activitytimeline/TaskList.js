import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform
} from "react-native";
import {List, ListItem} from 'react-native-elements';
import {getLetterAvatar} from '../../utilities/LetterAvatar';
import {showDetailView, showTasks} from "./../../actions/timeline";
import {fetchTasks} from './../../services/CTA';
var moment = require('moment');

const ContextLabelMapper: any = {};
ContextLabelMapper['Account'] = "C";
ContextLabelMapper['Company'] = "C";
ContextLabelMapper['Relationship'] = "R";
ContextLabelMapper['CTA'] = "CTA";

class TaskView extends React.Component{
    
}

export default class TasksList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            refreshing: false
        };
    }

    componentDidMount() {
        fetchTasks({ctaId: this.props.ctaId, activityId: this.props.activityId}).then((res)=>{
            this.setState({tasks: res.data, refreshing: true});
        });
    }

    render() {
        return (
            <FlatList
                data={this.state.tasks}
                renderItem={({ item, index }) =>
                    <View>
                        <View style={styles.listItemCont}>
                            <Text style={styles.listItem}>
                                {item.Name}
                            </Text>
                            <Button title="X" onPress={() => this.deleteTask(index)} />
                        </View>
                        <View style={styles.hr} />
                    </View>
                }
            />
        );
    }

}

const isAndroid = Platform.OS == "android";
const viewPadding = 10;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
      padding: viewPadding,
      paddingTop: 20
    },
    list: {
      width: "100%"
    },
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 18
    },
    hr: {
      height: 1,
      backgroundColor: "gray"
    },
    listItemCont: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    textInput: {
      height: 40,
      paddingRight: 10,
      paddingLeft: 10,
      borderColor: "gray",
      borderWidth: isAndroid ? 0 : 1,
      width: "100%"
    }
  });