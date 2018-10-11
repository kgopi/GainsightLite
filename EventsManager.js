import {
  notify
} from './src/services/NotifService';
import {
  Alert
} from 'react-native';
import { getAuthToken } from './src/services/Timeline';
const SocketClient = require("socketcluster-client").create;

class EventsManager {

  constructor() {
      this.initWebSocketConnection();
  }

  initWebSocketConnection() {

      let wsEndPoint = "";

      if(wsEndPoint == null){
      	return console.error(`Messenger server URL is absent`);
      }

      var options = {
          host: "ant-messenger.develgs.com:443" || wsEndPoint.replace('wss://', ''),
          secure: true,
          path: "/",
          autoReconnect: true,
          query: {
              id: null
          },
          multiplex: false
      };
      getAuthToken().done((res) => {
          options.query.id = res.token;

          debugger;
          const socket = SocketClient(options); // Initiate the connection to the server
          socket.on('connect', () => {
              console.log('WebSocket connection is successful ...');
              var broadcastChannel = socket.subscribe(`broadcast/1P01XB2BOT21HRIIZB3P6WRDB28LGVKHWV75`);
              broadcastChannel.watch((data) => {
                  debugger;
                  notify(data);
              });
          });

          socket.on('messages', (messages) => {
            //   debugger;
            //   _.each(messages, (message) => {
            //       this.onMessage(message, true);
            //   })
          });

          socket.on('connectAbort', (eve) => {
              console.error(eve);
          });

      });
  }

  onRegister(token) {
      Alert.alert("Registered !", JSON.stringify(token));
      console.log(token);
  }

  onNotif(notif) {
      console.log(notif);
      Alert.alert(notif.title, notif.message);
  }

}

export default new EventsManager();