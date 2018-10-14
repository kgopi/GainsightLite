import React, {Component} from "react";
import { Toolbar } from 'react-native-material-ui';

export class CTADetailViewToolbar extends Component{
    render(){
        const {item } = this.props;
        let contextName = item.CompanyId__gr.Name;

        return <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => this.props.navigation.pop()}
            centerElement={contextName}
        />
    }

}