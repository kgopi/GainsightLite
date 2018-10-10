import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {List} from 'react-native-elements';
import {ActivityView} from "./ActivityView";
import { fetchActivities } from '../../services/Timeline';

export class Timeline extends React.Component {

    state = {
        seed: 1,
        page: 1,
        activities: [],
        selectedActivity: null,
        isLoading: false,
        isRefreshing: false,
    };

    handleRefresh = () => {
        this.setState({
            seed: this.state.seed + 1,
            isRefreshing: true,
        }, () => {
            this.loadActivities();
        });
    };

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.loadActivities();
        });
    };

    componentDidMount() {
        this.loadActivities();
    };

    loadActivities = () => {
        const { activities, seed, page } = this.state;
        this.setState({ isLoading: true });
        fetchActivities({seed, page}).then(res => {
            this.setState({
                activities: page === 1 ? res.results : [...activities, ...res.results],
                isRefreshing: false,
            });
        })
    }

    render() {
        const { activities, isRefreshing, selectedActivity } = this.state;
        if(selectedActivity == null){
            return (
                <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={activities}
                            renderItem={({item})=>{return (<ActivityView item={item}></ActivityView>)}}
                            keyExtractor={(item, index) => index+""}
                            refreshing={isRefreshing}
                            onRefresh={this.handleRefresh}
                            onEndReached={this.handleLoadMore}
                            onEndThreshold={0}
                        />
                </List>
            );
        }else{
            return (
                <view></view>
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