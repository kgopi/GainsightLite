import React from 'react';
import {
    Platform,
    View,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import {
    GiftedChat,
    Actions, Bubble,
    MessageText
} from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';
import SlackMessage from './SlackMessage';
import {connect} from 'react-redux';
import {updateSallyState} from '../../actions/sally';
import { fetchSallyHistory, getSallyToken } from '../../services/Sally';
import {getLetterAvatar} from '../../utilities/LetterAvatar';
import {SallyBot} from './SallyBot';
import { ListItem, List } from 'react-native-elements';
var moment = require('moment');

class Sally extends React.Component {

    constructor(props){
        super(props);
        this.bot = React.createRef();
    }

    componentDidMount() {
        this.loadHistory();
    }

    sallyBotMessageToGifatCardMessage(chat){
        return chat.map((c)=>{
            let _id = c._id;
            let createdAt = new Date(c._source.createdAt);
            let text = c._source.conversation.text, helperText = {};
            try{
                helperText = JSON.parse(c._source.conversation.text);
                text = helperText.conversation.label;
            }catch(e){
                // skip
            }
            return {
                _id,
                text,
                createdAt,
                helperText,
                user: {
                  _id: c._source['user1'],
                  name: c._source['user1'] == "bot" ? "Gainsight Bot" : c._source['userName']
                },
                received: true
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
                console.log(JSON.stringify(messages));
                this.props.updateSallyState({messages});
            });
        });
    }

    onSend(messages = []) {
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
            "time": moment(),
            "ts": Date.now()
        };
        this.bot.current.deliverMessage(m);
        this.props.updateSallyState({messages: GiftedChat.append(this.props.messages, messages)});
    }

    renderMessage(props) {
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

    renderMessageText(props){
        const { containerStyle, wrapperStyle, messageTextStyle, ...messageTextProps } = props;
        const helperText = messageTextProps.currentMessage.helperText;
        if(helperText && helperText.conversation && helperText.conversation.help_list){
           return (
                <View>
                    <MessageText
                        {...messageTextProps}
                        textStyle={{
                            left: [styles.standardFont, styles.slackMessageText, messageTextProps.textStyle, messageTextStyle],
                        }}
                    />
                    {
                        helperText.conversation.help_list.map((item, i) => (
                            <View key={i} style={{flexDirection: "column", marginBottom: 8}}>
                                <Text style={styles.standardFont, messageTextProps.textStyle}>{item.text}</Text>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={{fontSize: 14}}>{"Smaple Query: "}</Text>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.query}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
           ); 
        }else{
            return (
                <MessageText
                    {...messageTextProps}
                    textStyle={{
                        left: [styles.standardFont, styles.slackMessageText, messageTextProps.textStyle, messageTextStyle],
                    }}
                />
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <GiftedChat messages = {this.props.messages} onSend = {messages => this.onSend(messages)}
                    user = {{_id: this.props.userId, name: this.props.userName}} 
                    renderMessage={this.renderMessage}
                    placeholder={"Ask Sally"}
                    renderMessageText={this.renderMessageText}
                />
                <SallyBot onTyping={(message)=>{
                        this.onTyping(message);
                    }} onMessageReply={(message)=>{
                        this.onMessageReply(message);
                    }} ref={this.bot} 
                />
            </View>
        );
    }

    onTyping(message){
        console.log(message);
    }

    onMessageReply(message){
        this.props.updateSallyState({messages: GiftedChat.append(this.props.messages, [{...message, received: true}])});
    }

}

const styles = StyleSheet.create({
    standardFont: {
      fontSize: 15,
    },
    slackMessageText: {
      marginLeft: 0,
      marginRight: 0,
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    username: {
      fontWeight: 'bold',
    },
    time: {
      textAlign: 'left',
      fontSize: 12,
    },
    timeContainer: {
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
    },
    headerItem: {
      marginRight: 10,
    },
    headerView: {
      // Try to align it better with the avatar on Android.
      marginTop: Platform.OS === 'android' ? -2 : 0,
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    /* eslint-disable react-native/no-color-literals */
    tick: {
      backgroundColor: 'transparent',
      color: 'white',
    },
    /* eslint-enable react-native/no-color-literals */
    tickView: {
      flexDirection: 'row',
    },
    slackImage: {
      borderRadius: 3,
      marginLeft: 0,
      marginRight: 0,
    },
  });

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