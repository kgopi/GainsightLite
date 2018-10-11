import React,{Component} from "react";
import {AppState, Alert} from "react-native";
import PushNotification from "react-native-push-notification";

let appCurrentVisualState;

export function notifyMesage(title, message, data={}){
    if (appCurrentVisualState === 'background') {
        PushNotification.localNotification({
            title,
            message,
            data:JSON.stringify(data)
        });
    } else {
        //Alert.alert(title, message);
        console.log(`Show in app notification`);
    }
}

export class PushNotificationControl extends Component{

    componentDidMount() {
        console.log('componentDidMount');
        this.configureNotificationService();
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    configureNotificationService(){
        console.log('Configure notification service');
        PushNotification.configure({
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: false,
            requestPermissions: true,
        });
    }

    handleAppStateChange(appState){
        console.log(`App status changes ${appState}`);
        appCurrentVisualState = appState;
    }

    render() {
        return null;
    }

}
