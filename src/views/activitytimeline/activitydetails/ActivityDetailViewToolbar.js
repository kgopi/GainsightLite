import React, {Component} from "react";
import { Toolbar } from 'react-native-material-ui';
import {displayName} from "../../../../app.json";

export class ActivityDetailViewToolbar extends Component{
    render(){
        const {routeparams } = this.props;
        const item = routeparams.item||{};
        let contextName = item.contexts[item.contexts.length-1].lbl;

        return <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => this.props.navigation.pop()}
            centerElement={contextName}
        />
    }

}