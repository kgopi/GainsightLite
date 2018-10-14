import React from "react";
import {StyleSheet, View, Text, ScrollView, Alert, ActivityIndicator} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {COLOR} from "react-native-material-ui";
import { CTADetailViewToolbar } from "./CTADetailViewToolbar";
import { Icon } from "react-native-elements";
import { getLetterAvatar } from "../../utilities/LetterAvatar";
import TasksList from "../activitytimeline/TaskList";

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

export class CTADetailView extends React.Component{

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        const itemId = navigation.getParam('itemId');
        const shouldLoadDetails = navigation.getParam('shouldLoadDetails');
        if(shouldLoadDetails && itemId){
            this.state = {isLoading:true, itemId};
        } else if (item){
            this.state = {item};
        } else{
            this.state = {error:true};
        }
    }

    _onMissingDetails(){
        this.setState({item:null, isLoading:false, error:true});
        Alert.alert(
            'Error',
            `Failed to get cta details`,
            [{ text: 'OK', onPress: () => {
                    this.props.navigation.pop();
                }}],
            { cancelable: false }
        );
    }

    componentDidMount(){
        const {isLoading, error, itemId} = this.state;

        if(error){
            this._onMissingDetails();
        } else if(isLoading){
            //##TODO
        }
    }

    render(){
        const { navigation } = this.props;
        const {item, isLoading, error} = this.state;

        if(error){
            return null;
        } else if(isLoading){
            return <ActivityIndicator size="large" color={COLOR.blue800} />;
        }

        let subjectStyle = item.IsClosed ? {textDecorationLine: 'line-through', textDecorationStyle: 'solid'} : {};
        let dueDateStyle = item.CreatedDate < Date.now() ? {color: COLOR.red600} : {};

        return (
            <View style={{flex:1}}>
                <CTADetailViewToolbar navigation={navigation} item={item} />
                <View style={styles.view}>
                    <View style={styles.header}>
                        {
                            getLetterAvatar(`${item.OwnerId__gr.FirstName} ${item.OwnerId__gr.LastName}`)
                        }
                        <View style={styles.subtitleView}>
                            <View style={styles.subtitleViewTop}>
                                <Text style={styles.subject}>{item.Name}</Text>
                            </View>
                            <View style={styles.subtitleViewBottom}>
                                <Icon name='star' color={item.IsImportant ? COLOR.blue400 : COLOR.orange400} />
                                <Icon name={item.PriorityId__gr.Name == "Medium" ? 'low-priority' : 'priority-high'} />
                                <Text style={{...styles.date}}>{`${item.ClosedTaskCount} of ${item.TotalTaskCount}`}</Text>
                                <Text style={{...styles.date, ...dueDateStyle}}>{moment(item.CreatedDate).format("DD/MM/YYYY h:mm a")}</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={styles.body}>
                        <TasksList ctaId={item.Gsid}></TasksList>
                    </ScrollView>
                </View>
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
        flexDirection: 'row',
        alignItems: 'center'
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