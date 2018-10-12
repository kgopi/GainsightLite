import React from 'react';
import {FlatList, StyleSheet, AppState, Platform, View, Switch, Text} from 'react-native';
import {List} from 'react-native-elements';
import ActivityView from "./ActivityView";
import { fetchActivities } from '../../services/Timeline';
import { ActivityDetailView } from './activitydetails/ActivityDetailView';
import {handleRefresh, handleLoadMore, loadActivities, updateTimelineState} from "./../../actions/timeline";
import {connect} from 'react-redux';
import {notifyMesage} from "../NotificationController";

class Timeline extends React.Component {

    componentDidMount() {
        this.loadActivities();
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(){
        notifyMesage('Title', 'Faasak Faask');
    }

    loadActivities = () => {
        const {activities, links, page, searchText, selfMode} = this.props;

        if(links.next == null && page.number > 0){
            return; // No more activities
        }

        console.log('Load activities');
        let query = selfMode ? `${encodeURIComponent('(uid#1P01XB2BOT21HRIIZB3P6WRDB28LGVKHWV75)')}` : '';
        fetchActivities({links, page, searchText, query}).then(res => {
            let data = res.data;
            this.props.updateTimelineState({links: data.links, page: data.page});
            this.props.loadActivities(page.number === 0 ? data.content : [...activities, ...data.content], false);
        });
    }

    render() {
        const { activities, isRefreshing, selectedActivity, navigation } = this.props;
        if(selectedActivity == null){
            return (
                <View>
                    <Text>{"Show mine"}</Text>
                    <Switch
                            onValueChange = {(isOn) => {
                                this.props.handleRefresh();
                                this.props.updateToggleMode(isOn);
                                setTimeout(()=>{
                                    this.loadActivities();
                                }, 0);
                            }}
                            value = {this.props.selfMode}
                    />
                    <List style={{flex: 1, backgroundColor: 'green'}} contentContainerStyle= {{flex: 1}} containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={activities}
                            renderItem={({item})=>{return (<ActivityView item={item} navigation={navigation}></ActivityView>)}}
                            keyExtractor={(item, index) => index+""}
                            refreshing={isRefreshing}
                            onRefresh={()=>{this.props.handleRefresh(); this.loadActivities();}}
                            onEndReached={()=>{this.loadActivities();}}
                            onEndThreshold={0.1}
                        />
                    </List>
                </View>
            );
        }else{
            return (
                <ActivityDetailView item={this.props.selectedActivity}></ActivityDetailView>
            );
        }
    }
}

const style = StyleSheet.create({
    activity: {
        width: '100%',
        backgroundColor: '#333',
        marginBottom: 10,
        paddingLeft: 25,
    },
    activityName: {
        fontSize: 17,
        paddingVertical: 20,
        color: '#fff'
    }
});

const mapStateToProps = state => {
    return {
        links: state.app.timeline.links,
        page: state.app.timeline.page,
        activities: state.app.timeline.activities,
        selectedActivity: state.app.timeline.selectedActivity,
        isLoading: state.app.timeline.isLoading,
        isRefreshing: state.app.timeline.isRefreshing,
        searchText: state.app.searchText,
        selfMode: state.app.timeline.selfMode
    }
  }
  
  const mapDispatchersToProps = dispatch => {
    return {
        handleRefresh: () => {
            dispatch(updateTimelineState({links: {next: null}, page: {number:0}, selfMode: false}));
        },
        loadActivities: (activities, isRefreshing) => {
            dispatch(loadActivities(activities, isRefreshing));
        },
        updateTimelineState: ({links, page}) => {
            dispatch(updateTimelineState({links, page}));
        },
        updateToggleMode: (selfMode)=>{
            dispatch(updateTimelineState({selfMode}));
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchersToProps)(Timeline);