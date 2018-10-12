import React, {Component} from "react";
import { Toolbar } from 'react-native-material-ui';
import {displayName} from "../../../app.json";

export class HomeToolbar extends Component{

    render(){
        return <Toolbar
            leftElement="menu"
            centerElement={displayName}
            searchable={{
                autoFocus: true,
                placeholder: 'Search',
            }}
            rightElement={{
                menu: {
                    icon: "more-vert",
                    labels: ["item 1", "item 2"]
                }
            }}
            onRightElementPress={ (label) => { console.log(label) }}
        />
    }

}