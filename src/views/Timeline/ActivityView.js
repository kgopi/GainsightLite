import React from 'react';
import {ListItem} from 'react-native-elements';
import {getLetterAvatar} from '../../utilities/LetterAvatar';
import {showDetailView} from "./../../actions/timeline";
import {connect} from 'react-redux';

class ActivityView extends React.Component{

    render() {
        return (<ListItem
                    roundAvatar
                    title={this.props.item.name.first}
                    subtitle={this.props.item.email}
                    avatar={
                        getLetterAvatar(this.props.item.name.first)
                    }
                    onPress={() => {this.props.showDetailView(this.props.item, "Timeline")}}
                />
        );
    }

}
  
const mapDispatchersToProps = dispatch => {
    return {
        showDetailView: (item, title) => {
            dispatch(showDetailView(item, title));
        }
    }
}
  
export default connect(null, mapDispatchersToProps)(ActivityView);