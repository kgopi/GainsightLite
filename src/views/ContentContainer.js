import React, {Component} from 'react';
import { Timeline } from '../views/Timeline/Timeline';
import { CTAList } from '../views/CTA/CTAList';
import {StyleSheet, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default class ContentContainer extends Component<Props> {

    render() {
      return (
        <View style={styles.container}>
            <ScrollableTabView
                    tabBarUnderlineColor="#fff"
                    tabBarUnderlineStyle={{backgroundColor: "#fff"}}
                    tabBarBackgroundColor ="#558dfd"
                    tabBarActiveTextColor="#fff"
                    tabBarInactiveTextColor="#88b0ac"
                    onChangeTab={(index) => {debugger; return this.props.onChangeTab(index)}}

            >
                <Timeline tabLabel="Timeline" />
                <CTAList tabLabel="CTA" />
                <Timeline tabLabel="CS360" />
            </ScrollableTabView>
        </View>
      );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 10
    }
  });