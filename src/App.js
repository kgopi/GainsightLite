import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import {MainContainer} from './views/MainContainer';
import {SignInScreen} from "./views/singin/SignInScreen";

const AppStack = createStackNavigator({ Home: MainContainer});
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