import React, {Component} from 'react';
import {
    Alert,
    View,
    StyleSheet,
    AsyncStorage,
    StatusBar
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Auth0 from 'react-native-auth0';
import {authCredentials} from "../../../app";

const auth0 = new Auth0(authCredentials);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        if(!userToken){
            this._authenticate();
        } else {
            this.props.navigation.navigate('Home');
        }
    };

    _authenticate = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile',
                audience: 'https://' + authCredentials.domain + '/userinfo'
            })
            .then((credentials) => {
                console.log(`AccessToken: ${ credentials.accessToken}`);
                AsyncStorage.setItem('userToken', credentials.accessToken).then(() => this._bootstrapAsync());
            })
            .catch(error => {
                console.log(error);
                Alert.alert(
                    'Failed',
                    `Failed to authenticate ${error}`,
                    [{ text: 'RETRY', onPress: () => this._authenticate()}],
                    { cancelable: false }
                );
            });
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

