import React from 'react';
import {FlatList, StyleSheet, AppState, Platform} from 'react-native';
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
        const {activities, links, page, searchText} = this.props;

        if(links.next == null && page.number > 0){
            return; // No more activities
        }

        fetchActivities({links, page, searchText}).then(res => {
            let data = res.data;
            this.props.updateTimelineState({links: data.links, page: data.page});
            this.props.loadActivities(page.number === 0 ? data.content : [...activities, ...data.content], false);
        });
    }

    render() {
        const { activities, isRefreshing, selectedActivity, navigation } = this.props;
        //debugger;
        if(selectedActivity == null){
            return (
                <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={activities}
                            renderItem={({item})=>{return (<ActivityView item={item} navigation={navigation}></ActivityView>)}}
                            keyExtractor={(item, index) => index+""}
                            refreshing={isRefreshing}
                            onRefresh={()=>{this.props.handleRefresh(); this.loadActivities();}}
                            onEndReached={()=>{this.loadActivities();}}
                            onEndThreshold={0}
                        />
                </List>
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
        searchText: state.app.searchText
    }
  }
  
  const mapDispatchersToProps = dispatch => {
    return {
        handleRefresh: () => {
            dispatch(updateTimelineState({links: {next: null}, page: {number:0}}));
        },
        loadActivities: (activities, isRefreshing) => {
            dispatch(loadActivities(activities, isRefreshing));
        },
        updateTimelineState: ({links, page}) => {
            dispatch(updateTimelineState({links, page}));
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchersToProps)(Timeline);