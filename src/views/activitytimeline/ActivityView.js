import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {getLetterAvatar} from '../../utilities/LetterAvatar';
import {showDetailView} from "./../../actions/timeline";
import {connect} from 'react-redux';
var moment = require('moment');

const ContextLabelMapper: any = {};
ContextLabelMapper['Account'] = "C";
ContextLabelMapper['Company'] = "C";
ContextLabelMapper['Relationship'] = "R";
ContextLabelMapper['CTA'] = "CTA";

class ActivityView extends React.Component{

    render() {
        let contextName = this.props.item.contexts[this.props.item.contexts.length-1].obj;
        return (<ListItem
                    roundAvatar
                    title={
                        <View style={styles.titleView}>
                            <Text style={styles.entity}>{ContextLabelMapper[contextName]}</Text>
                            <Text style={styles.entityName}>{contextName}</Text>
                        </View>
                    }
                    subtitle={
                        <View style={styles.subtitleView}>
                            <View style={styles.subtitleViewTop}>
                                <Text style={styles.subject}>{this.props.item.note.subject}</Text>
                            </View>
                            <View style={styles.subtitleViewBottom}>
                                <Text style={styles.author}>{this.props.item.author.name}</Text>
                                <Text style={styles.date}>{moment(this.props.item.note.activityDate).format("DD/MM/YYYY h:mm a")}</Text>
                            </View>
                        </View>
                    }
                    avatar={
                        getLetterAvatar(this.props.item.author.name)
                    }
                    onPress={() => {
                        this.props.navigation.navigate('ActivityDetails', {
                            item:this.props.item
                        });
                    }}
                />
        );
    }

}

const styles = StyleSheet.create({
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
  
const mapDispatchersToProps = dispatch => {
    return {
        showDetailView: (item, title) => {
            dispatch(showDetailView(item, title));
        }
    }
}
  
export default connect(null, mapDispatchersToProps)(ActivityView);