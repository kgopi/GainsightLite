import React, {Component} from "react";
import { Toolbar } from 'react-native-material-ui';
import {displayName} from "../../../app.json";
import connect from "react-redux/lib/connect/connect";

class HomeToolbar extends Component{

    render(){
        return <Toolbar
            leftElement="menu"
            onLeftElementPress={()=>{
                this.props.navigation.openDrawer();
            }}
            centerElement={displayName}
            searchable={{
                autoFocus: true,
                placeholder: 'Search',
            }}
            rightElement="notifications"
            onRightElementPress={ (label) => { console.log(label) }}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.app.GS.user.name
    }
}

export default connect(mapStateToProps)(HomeToolbar)