import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Platform 
} from "react-native";
import {List, ListItem, CheckBox, Icon, FormLabel} from 'react-native-elements';
import {getLetterAvatar} from '../../utilities/LetterAvatar';
import {showDetailView, showTasks} from "./../../actions/timeline";
import {fetchTasks, closeTask} from './../../services/CTA';
var moment = require('moment');
import {COLOR} from "react-native-material-ui";
import Snackbar from 'react-native-snackbar';

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
            debugger;
            if(res.result){
                res = res.data.closeStatus || res.data;
                Snackbar.show({
                    title: 'Task successfully updated',
                    duration: Snackbar.LENGTH_SHORT,
                });
                this.setState({IsClosed: !res.openStatusType});
            }else{
                Snackbar.show({
                    title: 'Failed to update the task',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        });
    }

    render(){
        let textStyle = this.state.IsClosed ? {textDecorationLine: 'line-through', fontStyle:'italic'} : {};
        return (
            <View style={styles.listItem}>
                <View style={styles.left}>
                    <CheckBox
                        title={this.props.item.Name}
                        checked={this.state.IsClosed}
                        textStyle={textStyle}
                        style={{backgroundColor: '#eaeaea'}}
                        onPress={() => this.saveTaskStatus()}
                    />
                </View>
                <View style={styles.right}>
                    <Text style={{top: -10, marginRight: 10}}>{moment(this.props.item.DueDate).format("DD/MM/YYYY")}</Text>
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
        if(this.state.tasks.length == 0){
            return (
                <View style={{paddingTop: 40, marginBottom: 20, flexDirection: 'column', alignItems: 'center'}}>
                    <Icon
                        reverse
                        name='tasks'
                        type='font-awesome'
                        color={COLOR.grey400}
                    />
                    <Text>
                        {"No Task's found.."}
                    </Text>
                </View>
            );
        }else{
            return (
                <List>
                    <FormLabel>{'Tasks'}</FormLabel>
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
        flexDirection: "row",
        alignItems: 'center'
    }
  });