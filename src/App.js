import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import {MainContainer} from './views/home/MainContainer';
import SignInScreen from "./views/singin/SignInScreen";
import {ActivityDetailView} from "./views/activitytimeline/activitydetails/ActivityDetailView";
import {CTADetailView} from "./views/CTA/CtaDetailView";
import { NotificationsView } from './views/NotificationsView';
import DrawerMenu from "./views/drawer/drawer";

const UserHomeScreen = createDrawerNavigator({
    HomeScreen: MainContainer
},{
    contentComponent: DrawerMenu,
    contentOptions: {
        activeTintColor: '#e91e63',
        style: {
            flex: 1,
            paddingTop: 15,
        }
    },
    headerMode: 'none'
});

const AppStack = createStackNavigator(
    {
        Home: UserHomeScreen,
        ActivityDetails:ActivityDetailView,
        CTADetails: CTADetailView,
        NotificationsView:NotificationsView
    }, {
        headerMode: 'none'
    });
const AuthStack = createStackNavigator({ SignIn: SignInScreen }, {
    headerMode: 'none'
});

export default createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth'
    }
);