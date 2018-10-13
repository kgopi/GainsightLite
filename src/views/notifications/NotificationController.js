import React,{Component} from "react";
import {AppState, Alert} from "react-native";
import PushNotification from "react-native-push-notification";

let appCurrentVisualState;

function generateNotification(notificationObject) {
    //if (appCurrentVisualState === 'background') {
        PushNotification.localNotification(notificationObject);
    /*} else {
        console.log(notificationObject);
        //Alert.alert(title, message);
        console.log(`Show in app notification`);
    }*/
}

function getJONotification(websocketMessge) {
    switch (websocketMessge.command){
        case 'UPDATE_DETAILS':{
            let {data, userName} = websocketMessge;
            let title = `Journey Program Updated`;
            let message = `Program '${data.joName}' updated by '${userName}'`;
            let extraDate = JSON.stringify(websocketMessge);
            return {title, message, extraDate};
        }
        break;
    }
}

export function createNotification(websocketMessge) {
    let notificationObject;
    switch (websocketMessge.area){
        case 'JOURNEY_PROGRAM':
            notificationObject = getJONotification(websocketMessge);
            break;
    }

    if(notificationObject){
        generateNotification(notificationObject);
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
