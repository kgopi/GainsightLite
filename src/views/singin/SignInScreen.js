import React, {Component} from 'react';
import {
    Alert,
    View,
    StyleSheet,
    StatusBar, Image
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {onSignedIn, onSignedInprogress, onUserInfoLoaded} from "../../actions/app";
import {auth0} from "./webauth";
import {fetchBootstrap} from "../../services/GSBootstrap";
import EventsManager from '../../../EventsManager';
import {Button} from "react-native-material-ui";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    buttoncontainer:{
        paddingTop:30,
        paddingBottom:30,
        width:200
    },
    buttontext:{
        fontSize:16
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
            //this._authenticate();
        } else {
            this._getUserDetails();
        }
    };

    _onUserDetailsFailed = ()=>{
        this.props.toggleLoader(false);
        Alert.alert(
            'Error',
            `Failed to get user details. Please try again`,
            [{ text: 'RETRY', onPress: () => {
                    this._getUserDetails();
                }}],
            { cancelable: false }
        );
    };

    _getUserDetails = () =>{
        this.props.toggleLoader(true);
        return fetchBootstrap().then((res)=>{
            if(!res || !res.data){
                this._onUserDetailsFailed();
            } else {
                this.props.toggleLoader(false);
                this.props.handleBootstrap(res.data);
                this.props.navigation.navigate('Home');
                EventsManager.initWebSocketConnection();
            }
        }).catch(()=>{
            this._onUserDetailsFailed();
        });
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
        let loginButton = null;
        if(!this.props.userToken){
            loginButton = (<View>
                <View style={{textAlign:"center", marginBottom:40,justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../logo_small.png')}/>
                </View>
                <Button raised primary text="Login" onPress={()=>this._authenticate()}  style={{
                    container:styles.buttoncontainer,
                    text:styles.buttontext
                }}/>
            </View>);
        }
        return (
            <View style={styles.container}>
                <Spinner visible={this.props.showLoader} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <StatusBar barStyle="default" />
                {loginButton}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userToken: state.app.userToken,
        showLoader: state.app.signin.showLoader
    }
};

const mapDispatchersToProps = dispatch => {
    return {
        handleSignIn: (userToken)=> {
            dispatch(onSignedIn(userToken));
        },
        toggleLoader:(showLoader)=>{
            dispatch(onSignedInprogress(showLoader));
        },
        handleBootstrap:(data)=> {
            dispatch(onUserInfoLoaded(data));
        },
    }
};

export default connect(mapStateToProps, mapDispatchersToProps)(SignInScreen);