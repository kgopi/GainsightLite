import React from 'react';
import {FlatList, StyleSheet, AppState, Platform, View, Switch, Text, ActivityIndicator} from 'react-native';
import ActivityView from "./ActivityView";
import {fetchActivities, fetchNextActivities} from '../../services/Timeline';
import {handleRefresh, handleLoadMore, loadActivities, updateTimelineState} from "./../../actions/timeline";
import {connect} from 'react-redux';
import { COLOR} from 'react-native-material-ui';

class Timeline extends React.Component {

    componentDidMount() {
        this.loadActivities();
    }

    loadActivities = (upsert=false) => {
        const {searchText, selfMode} = this.props;
        let userId = `(uid#${this.props.userId})`;
        let query = selfMode ? `${encodeURIComponent(userId)}` : '';
        this.props.updateTimelineState({isLoading:true});
        fetchActivities({searchText, query}).then(res => {
            this.props.updateTimelineState({isLoading:false});
            let data = res && res.data;
            if(!data) return;
            this.props.updateTimelineState({links: data.links, page: data.page});
            this.props.loadActivities(data.content,false);
        });
    };

    loadMore = ()=>{
        const {activities, links} = this.props;
        if((!links.next||!links.next.href) && activities.length>0){
            return; // No more activities
        }
        this.props.updateTimelineState({isLoading:true});
        fetchNextActivities(links.next.href).then(res => {
            this.props.updateTimelineState({isLoading:false});
            let data = res && res.data;
            if(!data) return;
            this.props.updateTimelineState({links: data.links, page: data.page});
            this.props.loadActivities([...activities, ...data.content],false);
        });
    };

    _renderListItem = ({item})=>{
        const {navigation} = this.props;
        return (<ActivityView item={item} navigation={navigation}></ActivityView>);
    };

    render() {
        const { activities, isRefreshing, navigation,isLoading } = this.props;

            let progress = !isRefreshing && isLoading?<ActivityIndicator size="large" color={COLOR.blue800} />:null;

            return (
                <View style={styles.listcntr}>
                    <View style={{backgroundColor: COLOR.grey50, paddingTop: 5, paddingBottom: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{top: 4, fontSize: 14, fontWeight: 'bold'}}>{"Show mine"}</Text>
                        <Switch
                                onValueChange = {(isOn) => {
                                    this.props.updateTimelineState({links: {next: null}, page: {number:0}, selfMode: isOn, isRefreshing:false});
                                    this.loadActivities();
                                }}
                                value = {this.props.selfMode}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={activities}
                            renderItem={this._renderListItem}
                            keyExtractor={(item, index) => item.id}
                            refreshing={isRefreshing}
                            onRefresh={()=>{
                                this.props.handleRefresh();
                                this.loadActivities();
                            }}
                            onEndReached={(info)=>{
                                console.log(info, this.props.isLoading);
                                if(info && info.distanceFromEnd>0 && !this.props.isLoading){
                                    console.log("loading activities");
                                    this.loadMore();
                                }
                            }}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                    {progress}
                </View>
            );
    }
}

const styles = StyleSheet.create({
    listcntr:{
      flex:1,
      height:'100%',
      display:'flex',
      flexDirection:'column'
    },
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
        selfMode: state.app.timeline.selfMode,
        userId:state.app.GS.user.id
    }
  }
  
  const mapDispatchersToProps = dispatch => {
    return {
        handleRefresh: () => {
            dispatch(updateTimelineState({links: {next: null}, page: {number:0}, isRefreshing:true}));
        },
        loadActivities: (activities, isRefreshing) => {
            dispatch(loadActivities(activities, isRefreshing));
        },
        updateTimelineState: (payload) => {
            dispatch(updateTimelineState(payload));
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchersToProps)(Timeline);