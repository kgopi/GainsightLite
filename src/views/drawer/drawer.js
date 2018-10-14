import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    View, Alert,
} from 'react-native';
import {Toolbar, Drawer, Avatar} from 'react-native-material-ui';
import connect from "react-redux/lib/connect/connect";
import EventsManager from "../../../EventsManager";
import {doLogout} from "../../services/LogoutService";
import {onSignedOut, onSignOutprogress} from "../../actions/app";
import Spinner from "react-native-loading-spinner-overlay";

class DrawerMenu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            active: 'people',
        };
    }

    _setInfoActive() {
        this.setState({ active: 'info' });
    }

    _doSignout(){
        this.props.toggleLoader(true);
        doLogout().then(()=>{
            this.props.toggleLoader(false);
            this.props.handleSignedOut();
            this.props.navigation.navigate('Auth');
        }).catch(error => {
            console.log(error);
            this.props.toggleLoader(false);
            Alert.alert(
                'Failed to Signout',
                `Failed to Signout from Gainsight. Please try again. ${(error && error.error_description)||''}`,
                [{ text: 'RETRY', onPress: () => {
                        this._doSignout();
                    }}],
                { cancelable: false }
            );
        });
    }

    _handleLogout(){
        this.props.navigation.closeDrawer();
        try{
            EventsManager.disconnectSocketConnection();
        }catch (e) {
        }
        this._doSignout();
    }

    render() {
        let {user} = this.props;
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.closeDrawer()}
                    centerElement="Welcome"
                />
                <View style={styles.container}>
                    <Drawer>
                        <Drawer.Header>
                            <Drawer.Header.Account
                                avatar={<Avatar text={user.name.charAt(0).toUpperCase()} />}
                                /*accounts={[
                                    { avatar: <Avatar text="H" />, key:"H" },
                                    { avatar: <Avatar text="L" />, key:"L" },
                                ]}*/
                                footer={{
                                    dense: true,
                                    centerElement: {
                                        primaryText: user.name,
                                        secondaryText: user.email,
                                    }/*,
                                    rightElement: 'arrow-drop-down',*/
                                }}
                            />
                        </Drawer.Header>
                        <Drawer.Section
                            divider
                            items={[
                                {
                                    icon: 'exit-to-app', value: 'Logout',
                                    active: this.state.active == 'logout',
                                    onPress: () => this._handleLogout(),
                                }]
                            }/>

                        {/*<Drawer.Section
                            divider
                            items={[
                                {
                                    icon: 'bookmark-border', value: 'Bookmarks',
                                    active: this.state.active == 'bookmark',
                                    onPress: () => {
                                        this.setState({ active: 'bookmark' });
                                        this.props.navigation.navigate('Bookmark');
                                    },
                                },
                                {
                                    icon: 'today', value: 'Calendar',
                                    active: this.state.active == 'calendar',
                                    onPress: () => {
                                        this.setState({ active: 'calendar' });
                                        this.props.navigation.navigate('Calendar');
                                    },
                                },
                                {
                                    icon: 'people', value: 'Clients',
                                    active: this.state.active == 'client',
                                    onPress: () => {
                                        this.setState({ active: 'client' });
                                        this.props.navigation.navigate('Client');
                                    },
                                },
                            ]}
                        />
                        <Drawer.Section
                            title="Personal"
                            items={[
                                {
                                    icon: 'info', value: 'Info',
                                    active: this.state.active == 'info',
                                    onPress: () => {
                                        this.setState({ active: 'info' });

                                        //this.props.navigation.navigate('DrawerClose');
                                        this.props.navigation.navigate('Info');
                                    },
                                },
                                {
                                    icon: 'settings', value: 'Settings',
                                    active: this.state.active == 'settings',
                                    onPress: () => {
                                        this.setState({ active: 'settings' });
                                        this.props.navigation.navigate('Settings');
                                    },
                                },
                            ]}
                        />*/}
                    </Drawer>
                </View>
                <Spinner visible={this.props.showLoader} textContent={"Signing out..."} textStyle={{color: '#FFF'}} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.app.GS.user,
        showLoader: state.app.signout.showLoader
    }
};

const mapDispatchersToProps = dispatch => {
    return {
        handleSignedOut: ()=> {
            dispatch(onSignedOut());
        },
        toggleLoader:(showLoader)=>{
            dispatch(onSignOutprogress(showLoader));
        }
    }
};


export default connect(mapStateToProps, mapDispatchersToProps)(DrawerMenu);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 4
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
