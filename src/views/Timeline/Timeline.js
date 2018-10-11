import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {List} from 'react-native-elements';
import ActivityView from "./ActivityView";
import { fetchActivities } from '../../services/Timeline';
import { ActivityDetailView } from './ActivityDetailView';
import {handleRefresh, handleLoadMore, loadActivities, updateTimelineState} from "./../../actions/timeline";
import {connect} from 'react-redux';

class Timeline extends React.Component {

    componentDidMount() {
        this.loadActivities();
    }

    loadActivities = () => {
        const {activities, links, page} = this.props;

        if(links.next == null && page.number > 0){
            return; // No more activities
        }

        fetchActivities({links, page}).then(res => {
            let data = res.data;
            this.props.updateTimelineState({links: data.links, page: data.page});
            this.props.loadActivities(page.number === 1 ? data.content : [...activities, ...data.content], false);
        });
    }

    render() {
        const { activities, isRefreshing, selectedActivity } = this.props;
        if(selectedActivity == null){
            return (
                <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={activities}
                            renderItem={({item})=>{return (<ActivityView item={item}></ActivityView>)}}
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
                <ActivityDetailView activity={this.props.selectedActivity}></ActivityDetailView>
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
        isRefreshing: state.app.timeline.isRefreshing
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