import React, {Component} from 'react';
import {
    Alert,
    View,
    StyleSheet,
    AsyncStorage,
    StatusBar,
    Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Auth0 from 'react-native-auth0';
import {authCredentials} from "../../../app";

const auth0 = new Auth0(authCredentials);
auth0.webAuth.client.authorizeUrl = function(query){
    return `https://${authCredentials.domain}/v1/ui/timeline/${Platform.OS}?state=${query.state}`;
};
auth0.webAuth.client.exchange = function (params) {
    if(params.code){
        return Promise.resolve(params);
    } else {
        return Promise.reject(`Authorization failed`);
    }
};

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
        this.state = {showLoader:true};
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        if(!userToken){
            this._authenticate();
        } else {
            this.setState({showLoader:false});
            this.props.navigation.navigate('Home');
        }
    };

    _authenticate = () => {
        auth0.webAuth
            .authorize()
            .then((credentials) => {
                console.log(`AccessToken: ${ credentials.code}`);
                AsyncStorage.setItem('userToken', credentials.code).then(() => this._bootstrapAsync());
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
                <Spinner visible={this.state.showLoader} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

