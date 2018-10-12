import React from "react";
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { Avatar } from "react-native-elements";
var moment = require('moment');
import HTMLView from 'react-native-htmlview';
import {getLetterAvatar} from '../../utilities/LetterAvatar';

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

export class CtaDetailView extends React.Component{

    render(){
        let contextName = this.props.item.contexts[this.props.item.contexts.length-1].obj;
        return (
            <View style={styles.view}>
                <View style={styles.header}>
                    {
                        getLetterAvatar(this.props.item.author.name)
                    }
                    <View>
                        <View style={styles.titleView}>
                            <Text style={styles.entity}>{ContextLabelMapper[contextName]}</Text>
                            <Text style={styles.entityName}>{contextName}</Text>
                        </View>
                        <View style={styles.subtitleView}>
                            <View style={styles.subtitleViewTop}>
                                <Text style={styles.subject}>{this.props.item.note.subject}</Text>
                            </View>
                            <View style={styles.subtitleViewBottom}>
                                <Text style={styles.author}>{this.props.item.author.name}</Text>
                                <Text style={styles.date}>{moment(this.props.item.note.activityDate).format("DD/MM/YYYY h:mm a")}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <ScrollView>
                        <HTMLView
                            value={htmlUnescape(this.props.item.note.content)}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    body:{
        borderTopWidth: 0.5,
        borderTopColor: '#97979733',
        marginTop: 10
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