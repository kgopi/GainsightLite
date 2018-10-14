import React,{Component} from "react";
import {AppState, Alert} from "react-native";
import PushNotification from "react-native-push-notification";

let appCurrentVisualState;
let globalNavigator;

function generateNotification(notificationObject) {
    //if (appCurrentVisualState === 'background') {
        PushNotification.localNotification(notificationObject);
    /*} else {
        console.log(notificationObject);
        //Alert.alert(title, message);
        console.log(`Show in app notification`);
    }*/
}

function getCTANotifications(websocketMessge) {
    switch (websocketMessge.command) {
        case 'CTA_CREATE': {
            let {data, userName} = websocketMessge;
            let title = `New CTA Created`;
            let message = `CTA '${data.Name}' created by '${userName}'`;
            let extraDate = JSON.stringify(websocketMessge);
            return {title, message, data:extraDate};
        }
    }
}

function getANTNotification(websocketMessge) {
    switch (websocketMessge.command){
        case 'ACTIVITY_INSERT':{
            let {data, userName} = websocketMessge;
            let title = `New Activity Logged`;
            let message = `Activity '${data.subject}' Logged by '${userName}'`;
            let extraDate = JSON.stringify(websocketMessge);
            return {title, message, data:extraDate};
        }
        case 'ACTIVITY_UPDATE':{
            let {data, userName} = websocketMessge;
            let title = `Activity Updated`;
            let message = `Activity '${data.subject}' updated by '${userName}'`;
            let extraDate = JSON.stringify(websocketMessge);
            return {title, message, data:extraDate};
        }
    }
}

function getJONotification(websocketMessge) {
    switch (websocketMessge.command){
        case 'UPDATE_DETAILS':{
            let {data, userName} = websocketMessge;
            let title = `Journey Program Updated`;
            let message = `Program '${data.joName}' updated by '${userName}'`;
            let extraDate = JSON.stringify(websocketMessge);
            return {title, message, data:extraDate};
        }
        case 'UPDATE_STATUS':{
            let {data, userName} = websocketMessge;
            let title = `Journey Program Status Changed`;
            let message = `Program '${data.joName}' status changed to '${data.newStatus}' by '${userName}'`;
            let extraDate = JSON.stringify(websocketMessge);
            return {title, message, data:extraDate};
        }
    }
}

export function createNotification(websocketMessge) {
    console.log(websocketMessge);
    let notificationObject;
    switch (websocketMessge.area){
        case 'ANT':
            notificationObject = getANTNotification(websocketMessge);
            break;
        case 'JOURNEY_PROGRAM':
            notificationObject = getJONotification(websocketMessge);
            break;
        case 'CTA':
            notificationObject = getCTANotifications(websocketMessge);
            break;
    }

    if(notificationObject){
        generateNotification(notificationObject);
    }
}

export function setNavigation(navigator) {
    globalNavigator = navigator;
}

function handleNotificationIntegraction({data}) {
    switch (data.area){
        case 'ANT':{

            switch (data.command){
                case 'ACTIVITY_INSERT':
                case 'ACTIVITY_UPDATE':
                    globalNavigator && globalNavigator.navigate('ActivityDetails', {
                        itemId: data.data.id,
                        shouldLoadDetails:true
                    });
                    break;
            }

        }
        case "CTA":{
            switch (data.command){
                case 'CTA_CREATE':
                    globalNavigator && globalNavigator.navigate('CTADetails', {
                        itemId: data.data.Id,
                        shouldLoadDetails:true
                    });
                    break;
            }
        }
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
            onNotification: (notification) => {
                console.log( 'NOTIFICATION:', notification);
                if(notification.userInteraction){
                    handleNotificationIntegraction(notification);
                }
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
