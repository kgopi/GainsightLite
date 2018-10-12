import React from "react";
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { Avatar } from "react-native-elements";
import HTMLView from 'react-native-htmlview';
import {getLetterAvatar} from '../../../utilities/LetterAvatar';
import {ActivityDetailViewToolbar} from "./ActivityDetailViewToolbar";
import TasksList from '././../TaskList';

const moment = require('moment');
const ContextLabelMapper: any = {};
ContextLabelMapper['Account'] = "C";
ContextLabelMapper['Company'] = "C";
ContextLabelMapper['Relationship'] = "R";
ContextLabelMapper['CTA'] = "CTA";

function htmlUnescape(replaceStr:string):string{
    if(replaceStr !== null && replaceStr !== undefined){
        return String(replaceStr)
            .replace(/&quot;/g, '"')
            .replace(/(&#39;)|(&apos;)/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
    }
    else{
        return '';
    }
}

export class ActivityDetailView extends React.Component{

    static navigationOptions = {
        header: ({navigation, scene})=>{
            let params = scene.route.params||{};
            return <ActivityDetailViewToolbar navigation={navigation} routeparams={params} />
        }
    };

    render(){
        const { navigation } = this.props;
        const item = navigation.getParam('item', {});
        let contextObj = item.contexts[item.contexts.length-1];
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    {
                        getLetterAvatar(item.author.name)
                    }
                    <View style={styles.subtitleView}>
                        <View style={styles.subtitleViewTop}>
                            <Text style={styles.subject}>{item.note.subject}</Text>
                        </View>
                        <View style={styles.subtitleViewBottom}>
                            <Text style={styles.author}>{item.author.name}</Text>
                            <Text style={styles.date}>{moment(item.note.activityDate).format("DD/MM/YYYY h:mm a")}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.body}>
                    <HTMLView value={htmlUnescape(item.note.content)}/>
                    <TasksList ctaId={item.meta.ctaId} activityId={item.id}></TasksList>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
      backgroundColor:'#ffffff',
      flex:1
    },
    header:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#000000',
    },
    body:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        marginTop: 10,
        fontSize:13
    },
    titleView:{
        flexDirection: 'row',
        paddingLeft: 8
    },
    entity:{
        backgroundColor: '#F3F3F3',
        borderRadius: 3,
        color: '#445160',
        fontSize: 12,
        marginRight: 5
    },
    entityName:{
        fontSize: 14,
        paddingLeft: 8,
        color: '#00b4e5'
    },
    subtitleView: {
        flexDirection: 'column',
        paddingLeft: 8
    },
    subtitleViewTop: {
        flexDirection: 'row'
    },
    subtitleViewBottom:{
        flexDirection: 'row'
    },
    subject:{
        color: '#374353',
        fontSize: 14
    },
    author: {
        color: '#374353',
        fontSize: 12,
        marginRight: 4
    },
    date:{
        marginLeft: 4,
        borderLeftWidth: 1,
        borderLeftColor: "#dedbdb",
        paddingLeft: 10,
        color: '#374353',
        fontSize: 12
    }
});