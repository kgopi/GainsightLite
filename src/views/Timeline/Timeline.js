import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {List} from 'react-native-elements';
import ActivityView from "./ActivityView";
import { fetchActivities } from '../../services/Timeline';
import { ActivityDetailView } from './ActivityDetailView';
import {handleRefresh, handleLoadMore, loadActivities} from "./../../actions/timeline";
import {connect} from 'react-redux';

class Timeline extends React.Component {

    componentDidMount() {
        this.loadActivities();
    }

    loadActivities = () => {
        const { activities, seed, page } = this.props;
        fetchActivities({seed, page}).then(res => {
            this.props.loadActivities(page === 1 ? res.results : [...activities, ...res.results], false);
        })
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
                            onRefresh={()=>{this.props.handleRefresh(this.props.seed+1); this.loadActivities();}}
                            onEndReached={()=>{this.props.handleLoadMore(this.props.page+1); this.loadActivities();}}
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
        seed: state.app.timeline.seed,
        page: state.app.timeline.page,
        activities: state.app.timeline.activities,
        selectedActivity: state.app.timeline.selectedActivity,
        isLoading: state.app.timeline.isLoading,
        isRefreshing: state.app.timeline.isRefreshing
    }
  }
  
  const mapDispatchersToProps = dispatch => {
    return {
        handleRefresh: (seed) => {
            dispatch(handleRefresh(seed));
        },
        handleLoadMore: (page) => {
            dispatch(handleLoadMore(page));
        },
        loadActivities: (activities, isRefreshing) => {
            dispatch(loadActivities(activities, isRefreshing));
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchersToProps)(Timeline);