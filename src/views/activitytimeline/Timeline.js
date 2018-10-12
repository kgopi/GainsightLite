import React from 'react';
import {FlatList, StyleSheet, AppState, Platform, View, Switch, Text, ActivityIndicator} from 'react-native';
import ActivityView from "./ActivityView";
import { fetchActivities } from '../../services/Timeline';
import {handleRefresh, handleLoadMore, loadActivities, updateTimelineState} from "./../../actions/timeline";
import {connect} from 'react-redux';
import { COLOR} from 'react-native-material-ui';

class Timeline extends React.Component {

    componentDidMount() {
        this.loadActivities();
    }

    loadActivities = () => {
        const {activities, links, page, searchText, selfMode} = this.props;

        if((!links.next||!links.next.href) && activities.length>0){
            return; // No more activities
        }

        console.log('Load activities');
        let userId = `(uid#${this.props.userId})`;
        let query = selfMode ? `${encodeURIComponent(userId)}` : '';
        this.props.updateTimelineState({isLoading:true});
        fetchActivities({links, page, searchText, query, activities}).then(res => {
            this.props.updateTimelineState({isLoading:false});
            let data = res && res.data;
            if(!data) return;
            this.props.updateTimelineState({links: data.links, page: data.page});
            this.props.loadActivities(page.number === 0 ? data.content : [...activities, ...data.content], false);
        });
    };

    render() {
        const { activities, isRefreshing, navigation,isLoading } = this.props;

            let progress = isLoading?<ActivityIndicator size="large" color="#0000ff" />:null;

            return (
                <View style={styles.listcntr}>
                    <View style={{backgroundColor: COLOR.grey50, paddingTop: 5, paddingBottom: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{top: 4, fontSize: 14, fontWeight: 'bold'}}>{"Show mine"}</Text>
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
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={activities}
                            renderItem={({item})=>{return (<ActivityView item={item} navigation={navigation}></ActivityView>)}}
                            keyExtractor={(item, index) => index+""}
                            refreshing={isRefreshing}
                            onRefresh={()=>{
                                this.props.handleRefresh();
                                this.loadActivities(true);
                            }}
                            onEndReached={(info)=>{
                                console.log(info, this.props.isLoading);
                                if(!this.props.isLoading){
                                    console.log("loading activities");
                                    this.loadActivities();
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
            dispatch(updateTimelineState({links: {next: null}, page: {number:0}, selfMode: false, isRefreshing:true}));
        },
        loadActivities: (activities, isRefreshing) => {
            dispatch(loadActivities(activities, isRefreshing));
        },
        updateTimelineState: (payload) => {
            dispatch(updateTimelineState(payload));
        },
        updateToggleMode: (selfMode)=>{
            dispatch(updateTimelineState({selfMode}));
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchersToProps)(Timeline);