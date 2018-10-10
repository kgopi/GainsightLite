import React from "react";
import {View, Text} from "react-native";

export class ActivityDetailView extends React.Component{

    render(){
        return (
            <View>
                <Text>{this.props.activity.note.content}</Text>
            </View>
        );
    }

}