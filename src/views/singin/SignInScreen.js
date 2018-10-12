import React, {Component} from 'react';
import {
    Alert,
    View,
    StyleSheet,
    StatusBar} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {onSignedIn} from "../../actions/app";
import {auth0} from "./webauth";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = () => {
        const userToken = this.props.userToken;
        if(!userToken){
            this._authenticate();
        } else {
            this.props.navigation.navigate('Home');
        }
    };

    _authenticate = () => {
        auth0.webAuth
            .authorize()
            .then((credentials) => {
                console.log(`AccessToken: ${ credentials.code}`);
                this.props.handleSignIn(credentials.code);
                this._bootstrapAsync();
            })
            .catch(error => {
                console.log(error);
                Alert.alert(
                    'Failed to authenticate',
                    `Authentication failed with Gainsight. Please try again. ${(error && error.error_description)||''}`,
                    [{ text: 'RETRY', onPress: () => {
                            this._authenticate();
                        }}],
                    { cancelable: false }
                );
            });
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.props.showLoader} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userToken: state.app.userToken,
        showLoader: !state.app.userToken
    }
};

const mapDispatchersToProps = dispatch => {
    return {
        handleSignIn: (userToken)=> {
            dispatch(onSignedIn(userToken));
        }
    }
};

export default connect(mapStateToProps, mapDispatchersToProps)(SignInScreen);