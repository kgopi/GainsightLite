const SALLY_WS_URL = "wss://collaborations.develgs.com:9050";
import React from 'react';

export class SallyBot extends React.Component {
    socket;
    reconnectCount = 0;

    render(){
        return null;
    }

    componentDidMount() {
        this.init();
    }

    init() {
        if (!this.socket || this.socket.readyState !== this.socket.OPEN) {
            this.connectWebsocket(SALLY_WS_URL)
        }
        return this;
    }

    connectWebsocket(WSURL, notDeliveredMessage=null) {
        this.socket = new WebSocket(WSURL);
        this.attachEvents(notDeliveredMessage);
    }
    
    attachEvents(notDeliveredMessage=null) {
        let thiz = this;
        // Connection opened
        thiz.socket.addEventListener('open', function(event) {
            console.log('CONNECTED TO SOCKET');
            if (notDeliveredMessage) {
                this.socket.send(JSON.stringify(notDeliveredMessage));
                console.log('Reconnected and delivered message');
            }
        });

        thiz.socket.addEventListener('error', function(event) {
            console.error('ERROR', event);
        });

        thiz.socket.addEventListener('close', function(event) {
            console.log('SOCKET CLOSED!');
            if (thiz.reconnectCount < thiz.config.maxReconnectCount) {
                setTimeout(function() {
                    console.log('RECONNECTING ATTEMPT ', ++thiz.reconnectCount);
                    thiz.connectWebsocket(SALLY_WS_URL, notDeliveredMessage);
                }, thiz.config.reconnectTimeout*1000);
            } else {
                if (notDeliveredMessage) {
                    console.log('message not delivered')
                }
            }
        });

        // Listen for messages
        thiz.socket.addEventListener('message', (event) => {
            let message = null;
            try {
                message = JSON.parse(event.data);
            } catch (err) {
                thiz.appEventBus.trigger('socket_error', err);
                return;
            }
            message.time = new Date();
            message.globalTrackingId = message.globalTrackingId || 'connecting';
            message.type == "typing"
                ? this.props.onTyping(message)
                : this.props.onMessageReply(this.toGiftCardMessage(message));
        });
    };

    toGiftCardMessage(m){
        return {
            _id: Date.now(),
            text: m.conversation.label,
            helperText: m,
            createdAt: m.time,
            user: {
              _id: 'bot',
              name: "Gainsight Bot"
            }
        }
    }

    deliverMessage(message) {
        if (this.socket.readyState === this.socket.OPEN) {
            this.socket.send(JSON.stringify(message));
            console.log('message delivered')
        } else {
            this.connectWebsocket(this.config.WSURL, message);
        }
        return message;
    };

}