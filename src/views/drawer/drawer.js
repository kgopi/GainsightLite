import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
} from 'react-native';
import {Toolbar, Drawer, Avatar} from 'react-native-material-ui';
import connect from "react-redux/lib/connect/connect";

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

    render() {
        let {user} = this.props;
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.closeDrawer()}
                    centerElement=""
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
                                    onPress: () => {
                                        //this.setState({active: 'logout'});
                                        //this.props.navigation.navigate('logout');
                                    },
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
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.app.GS.user
    }
};

export default connect(mapStateToProps)(DrawerMenu);

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
