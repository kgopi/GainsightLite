import React from 'react';
import {ListItem} from 'react-native-elements';
import {getLetterAvatar} from '../../utilities/LetterAvatar';

export class ActivityView extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (<ListItem
                    roundAvatar
                    title={this.props.item.name.first}
                    subtitle={this.props.item.email}
                    avatar={
                        getLetterAvatar(this.props.item.name.first)
                    }
                    onPress={() => this.onPress(this.props.item)}
                />
        );
    }

    onPress = (name) => {
        console.log(name);
    }

}