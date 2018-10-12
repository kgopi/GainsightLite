
import {notifyMesage} from "./src/views/NotificationController";
import {
    Alert
} from 'react-native';
import {
    getAuthToken
} from './src/services/Timeline';
const SocketClient = require("socketcluster-client").create;

class EventsManager {

    constructor() {
        this.initWebSocketConnection();
    }

    notify(data){
        var title, message;
        if(data.area == "ANT"){
            title = `${data.userName} posted a new Activity..`
            message = `${data.data.subject}`;
        }else{
            title = "I am the Kalkhi";
            message = "How are you man";
        }
        notifyMesage(title, message, data);
    }

    initWebSocketConnection() {

        let wsEndPoint = "";

        if (wsEndPoint == null) {
            return console.error(`Messenger server URL is absent`);
        }

        var options = {
            host: "ant-messenger.develgs.com:443" || wsEndPoint.replace('wss://', ''),
            secure: true,
            path: "/",
            autoReconnect: true,
            query: {
                id: null
            }
        };
        getAuthToken().done((res) => {

            if (res.token == null) {
                console.log("Failed to get token to initialize Websocket connection");
                return;
            }

            options.query.id = res.token;

            const socket = SocketClient(options); // Initiate the connection to the server
            socket.on('connect', () => {
                console.log('WebSocket connection is successful ...');
                var userChannel = socket.subscribe(`broadcast/e835971d-c3b0-461b-85aa-c079f0bb051a/1P01XB2BOT21HRIIZB3P6WRDB28LGVKHWV75`);
                userChannel.watch((data) => {
                    this.notify(data);
                });
                var tenantChannel = socket.subscribe(`broadcast/e835971d-c3b0-461b-85aa-c079f0bb051a`);
                tenantChannel.watch((data) => {
                    this.notify(data);
                });
            });

            socket.on('messages', (messages) => {
                console.log('receivied messages', messages);
            });

            socket.on('connectAbort', (eve) => {
                console.log("Connection aborted, retrying the connection", eve);
                getAuthToken().done((res)=>{
					options.query.id = res.data.token;
				});
            });

        });
    }

}

export default new EventsManager();