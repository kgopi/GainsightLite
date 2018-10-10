import React, {Component} from 'react';
//import {configurePushNotifications} from './PushNotifications';
import {
    Platform,
    Alert,
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import Auth0 from 'react-native-auth0';
import Spinner from 'react-native-loading-spinner-overlay';

import {authCredentials} from './app.json';
import MainContainer from './src/views/MainContainer';
const auth0 = new Auth0(authCredentials);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {accessToken: null};
    }

    authenticate = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile',
                audience: 'https://' + authCredentials.domain + '/userinfo'
            })
            .then(credentials => {
                console.log(`AccessToken: ${ credentials.accessToken}`);
                this.setState({ accessToken: credentials.accessToken });
            })
            .catch(error => {
                console.log(error);
                Alert.alert(
                    'Failed',
                    `Failed to authenticate ${error}`,
                    [{ text: 'RETRY', onPress: () => this.authenticate() }],
                    { cancelable: false }
                );
            });
    };

    _onLogout = () => {
        if (Platform.OS === 'android') {
            this.setState({ accessToken: null });
        } else {
            auth0.webAuth
                .clearSession({})
                .then(success => {
                    this.setState({ accessToken: null });
                })
                .catch(error => console.log(error));
        }
    };

    componentDidMount() {
        setTimeout(()=> this.authenticate(), 1000);
    }

    render() {
        let loggedIn = this.state.accessToken === null ? false : true;
        if(loggedIn){
            return (
                <MainContainer></MainContainer>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
//configurePushNotifications();
