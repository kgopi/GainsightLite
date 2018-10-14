import {createNotification} from "./src/views/notifications/NotificationController";
import {
    getAuthToken
} from './src/services/Timeline';
const SocketClient = require("socketcluster-client");
import store from './src/Store';

class EventsManager{

    /*notify(data){
        var title, message;
        if(data.area == "ANT"){
            title = `${data.userName} posted a new Activity..`
            message = `${data.data.subject}`;
        }else{
            title = "I am the Kalkhi";
            message = "How are you man";
        }
        notifyMesage(title, message, data);
    }*/

    _currentSocket = null;

    disconnectSocketConnection(){
        if(this._currentSocket){
            SocketClient.destroy(this._currentSocket);
            this._currentSocket = null;
        }
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

            const socket = this._currentSocket = SocketClient.create(options); // Initiate the connection to the server
            socket.on('connect', () => {
                console.log('WebSocket connection is successful ...');

                let state = store.getState();
                let userId = state.app.GS.user.id;
                let tenantId = state.app.GS.instance.id;

                var userChannel = socket.subscribe(`broadcast/${tenantId}/${userId}`);
                console.log(`Subscribed to broadcast/${tenantId}/${userId}`);
                userChannel.watch((data) => {
                    createNotification(data);
                });
                var tenantChannel = socket.subscribe(`broadcast/${tenantId}`);
                console.log(`Subscribed to broadcast/${tenantId}`);
                tenantChannel.watch((data) => {
                    createNotification(data);
                });
            });

            socket.on('messages', (messages) => {
                console.log('receivied messages', messages);
            });

            socket.on('connectAbort', (eve) => {
                console.log("Connection aborted, retrying the connection", eve);
                getAuthToken().done((res)=>{
					options.query.id = res.token;
				});
            });

        });
    }

}

export default new EventsManager();