import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import {MainContainer} from './views/home/MainContainer';
import SignInScreen from "./views/singin/SignInScreen";
import {ActivityDetailView} from "./views/activitytimeline/activitydetails/ActivityDetailView";
import { NotificationsView } from './views/NotificationsView';

const AppStack = createStackNavigator({ Home: MainContainer, ActivityDetails:ActivityDetailView, NotificationsView:NotificationsView});
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