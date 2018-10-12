import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Platform 
} from "react-native";
import {List, ListItem, CheckBox} from 'react-native-elements';
import {getLetterAvatar} from '../../utilities/LetterAvatar';
import {showDetailView, showTasks} from "./../../actions/timeline";
import {fetchTasks, closeTask} from './../../services/CTA';
var moment = require('moment');

const ContextLabelMapper: any = {};
ContextLabelMapper['Account'] = "C";
ContextLabelMapper['Company'] = "C";
ContextLabelMapper['Relationship'] = "R";
ContextLabelMapper['CTA'] = "CTA";

class TaskView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            IsClosed: this.props.item.IsClosed
        }
    }

    saveTaskStatus(){
        closeTask(this.props.item.Gsid, !this.state.IsClosed).then((res)=>{
            this.setState({IsClosed: res.result ? !this.state.IsClosed : this.state.IsClosed});
        });
    }

    render(){
        return (
            <View style={styles.listItem}>
                <View style={styles.left}>
                    <CheckBox
                        title={this.props.item.Name}
                        checked={this.state.IsClosed}
                        style={{backgroundColor: '#eaeaea'}}
                        onPress={() => this.saveTaskStatus()}
                    />
                </View>
                <View style={styles.right}>
                    <Text style={{alignItems: 'center', marginRight: 10}}>{moment(this.props.item.DueDate).format("DD/MM/YYYY h:mm a")}</Text>
                    {getLetterAvatar(this.props.item.OwnerId__gr.FirstName)}
                </View>
            </View>
        );
    }
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
            <List>
                <Text style={{marginTop: 10}}>{"Tasks"}</Text>
                <FlatList
                    data={this.state.tasks}
                    keyExtractor={(item, index) => index+""}
                    renderItem={({ item, index }) =>
                        <TaskView Gsid={item.Gsid} item={item}></TaskView>
                    }
                />
            </List>
        );
    }

}

const isAndroid = Platform.OS == "android";
const viewPadding = 10;
const styles = StyleSheet.create({
    left:{
        alignItems: "flex-start",
        flexDirection: "row"
    },
    right: {
        alignItems: "flex-end",
        flexDirection: 'row'
    },
    listItem: {
        display: 'flex',
        flexDirection: "row"
    }
  });