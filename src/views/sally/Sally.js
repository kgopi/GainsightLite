import React from 'react';
import {
    Platform,
    View
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
import {SallyBot} from './SallyBot';

class Sally extends React.Component {

    constructor(props){
        super(props);
        this.isAllChatHistoryRendered = false;
        this.bot = React.createRef();
    }

    componentDidMount() {
        this.loadHistory();
    }

    sallyBotMessageToGifatCardMessage(chat){
        return chat.map((c)=>{
            let _id = c._id;
            let createdAt = new Date(c._source.createdAt);
            let text = c._source.conversation.text;
            try{
                let texObj = JSON.parse(c._source.conversation.text);
                text = texObj.conversation.label
            }catch(e){
                // skip
            }
            return {
                _id,
                text,
                createdAt,
                user: {
                  _id: c._source['user1'],
                  name: c._source['user1'] == "bot" ? "Gainsight Bot" : c._source['userName']
                }
            }
        }).sort((o, t)=>{
            return o.user.createdAt - t.user.createdAt
        });
    }

    loadHistory(){
        getSallyToken({tenantId: this.props.tenantId, userId: this.props.userId}).then((res)=>{
            this.props.updateSallyState({sallyAuthToken: res.token});
            fetchSallyHistory({tenantId: this.props.tenantId, userId: this.props.userId, sallyAuthToken: res.token}).then((result)=>{
                let messages = this.sallyBotMessageToGifatCardMessage(result.hits || []);
                this.props.updateSallyState({messages});
            });
        });
    }

    onSend(messages = []) {
        console.log("onSend", arguments);
        let message = messages[0];
        let m = {
            "type": "message",
            "text": message.text,
            "sallyAuthToken": this.props.sallyAuthToken,
            "user": this.props.userId,
            "userInfo": {
                "tenantType": this.props.GS.instance.type,
                "tenantName": this.props.GS.instance.name,
                "tenantId": this.props.GS.instance.id,
                "gsUserId": this.props.GS.user.id,
                "gsUserName": this.props.GS.user.name,
                "gsUserEmail": this.props.GS.user.email,
                "sfdcUserId": this.props.GS.user.id,
                "sfdcUserName": this.props.GS.user.name,
                "sfdcUserEmail": this.props.GS.user.email
            },
            "channel":"gainsight",
            "time":"2018-10-13T11:08:03.166Z",
            "ts":1539428883166
        };
        this.bot.current.deliverMessage(m);
        console.log(messages);
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
        return (
            <View style={{flex: 1}}>
                <GiftedChat messages = {this.props.messages} onSend = {messages => this.onSend(messages)}
                    user = {{_id: this.props.userId, name: this.props.userName}} 
                    renderMessage={this.renderMessage}
                />
                <SallyBot onTyping={(message)=>{
                    this.onTyping(message);
                }} onMessageReply={(message)=>{
                    this.onMessageReply(message);
                }} ref={this.bot} />
            </View>
        );
    }

    onTyping(message){
        console.log(message);
    }

    onMessageReply(message){
        debugger;
        this.props.updateSallyState({messages: GiftedChat.append(this.props.messages, [message])});
    }

}

const matchStateToProps = (state) => {
    return {
        messages: state.app.sally.messages,
        sallyAuthToken: state.app.sally.sallyAuthToken,
        userId: state.app.GS.user.id,
        userName: state.app.GS.user.name,
        tenantId: state.app.GS.instance.id,
        GS: state.app.GS
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