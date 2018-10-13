import React from 'react';
import {
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import {
    GiftedChat,
    Actions, Bubble
} from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';
import SlackMessage from './SlackMessage';
import {connect} from 'react-redux';
import {updateSallyState} from '../../actions/sally';
import { fetchSallyHistory, getSallyToken } from '../../services/Sally';
import {getLetterAvatar} from '../../utilities/LetterAvatar';

class Sally extends React.Component {

    componentDidMount() {
        this.loadHistory();
    }

    loadHistory(){
        getSallyToken({tenantId: this.props.tenantId, userId: this.props.userId}).then((res)=>{
            fetchSallyHistory({tenantId: this.props.tenantId, userId: this.props.userId, sallyAuthToken: res.token}).then((result)=>{
                this.props.updateSallyState({messages: result.hits});
            });
        });
    }

    onSend(messages = []) {
        console.log("onSend", arguments);
        this.props.updateSallyState({messages: GiftedChat.append(this.props.messages, messages)});
    }

    renderMessage(props) {
        console.log("renderMessage", props);
        const {
            currentMessage: {
                text: currText
            }
        } = props;

        let messageTextStyle;

        if (currText && emojiUtils.isPureEmojiString(currText)) {
            messageTextStyle = {
                fontSize: 28,
                lineHeight: Platform.OS === 'android' ? 34 : 30,
            };
        }

        return ( 
            <SlackMessage {...props} messageTextStyle = {messageTextStyle}/>
        );
    }

    render() {
        debugger;
        return ( 
            <GiftedChat messages = {this.props.messages} onSend = {messages => this.onSend(messages)}
                user = {{_id: this.props.userId, name: this.props.userName}} 
                renderMessage={this.renderMessage}
            />
        );
    }

}

const matchStateToProps = (state) => {
    return {
        messages: state.app.sally.messages,
        userId: state.app.GS.user.id,
        userName: state.app.GS.user.name,
        tenantId: state.app.GS.instance.id
    }
}

const matchDispatchersToState = (dispatcher) => {
    return {
        updateSallyState: (data)=>{
            dispatcher(updateSallyState(data));
        }
    }
}

export default connect(matchStateToProps, matchDispatchersToState)(Sally);