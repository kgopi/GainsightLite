import React, {Component} from 'react';
import { Timeline } from '../views/Timeline/Timeline';
import { CTAList } from '../views/CTA/CTAList';
import {StyleSheet, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default class ContentContainer extends Component<Props> {

    render() {
        if(this.props.state.isDetailView){
            return (
                <View style={styles.container}>
                    <Timeline onDetailView={this.props.onDetailView} tabLabel="Timeline" />
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
                            onChangeTab={(index) => {return this.props.onChangeTab(index)}}
                    >
                        <Timeline onDetailView={this.props.onDetailView} tabLabel="Timeline" />
                        <CTAList onDetailView={this.props.onDetailView} tabLabel="CTA" />
                        <Timeline onDetailView={this.props.onDetailView} tabLabel="CS360" />
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