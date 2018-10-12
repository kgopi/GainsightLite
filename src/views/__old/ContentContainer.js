import React, {Component} from 'react';
import Timeline from '../activitytimeline/Timeline';
import { CTAList } from '../calltoaction/CTAList';
import {StyleSheet, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {onChangeTab} from '../../actions/app';
import {connect} from 'react-redux';

class ContentContainer extends Component<Props> {

    render() {
        if(this.props.isDetailView){
            return (
                <View style={styles.container}>
                    <Timeline tabLabel="Timeline" />
                </View>
              );
        }else{
            return (
                <View style={styles.container}>
                    <ScrollableTabView
                            tabBarUnderlineColor="#fff"
                            tabBarUnderlineStyle={{backgroundColor: "#fff"}}
                            tabBarBackgroundColor ="#558dfd"
                            tabBarActiveTextColor="#fff"
                            tabBarInactiveTextColor="#88b0ac"
                            onChangeTab={(tab) => {this.props.onChangeTab(tab.i)}}
                    >
                        <Timeline tabLabel="Timeline" />
                        <CTAList tabLabel="CTA" />
                        <Timeline  tabLabel="CS360" />
                    </ScrollableTabView>
                </View>
              );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 10
    }
  });

  const mapStateToProps = state => {
    return {
        isDetailView: state.isDetailView
    }
  }
  
  const mapDispatchersToProps = dispatch => {
    return {
        onChangeTab: (selectedTab) => {
            dispatch(onChangeTab(selectedTab));
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchersToProps)(ContentContainer);