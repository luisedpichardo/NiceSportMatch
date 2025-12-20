import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
// Components
import { OpenSettings } from '../components/OpenSettings';
// Screens
import { Chat } from '../screens/Chat';
import { Login } from '../screens/Login';
import { Main } from '../screens/Main';
import { Matches } from '../screens/Matches';
import { SignUp } from '../screens/SignUp';
import { ProfileInfo } from '../screens/ProfileInfo';
import { Settings } from '../screens/Settings';
// Stores
import { useUserStore } from '../stores/userStore';
// Types
import { NavAuthStack, NavHomeTab, NavRoot } from './types';

const Stack = createNativeStackNavigator<NavRoot>();
const NavAuthS = createNativeStackNavigator<NavAuthStack>();
const TabHome = createNativeBottomTabNavigator<NavHomeTab>();

function AuthStack() {
  return (
    <NavAuthS.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <NavAuthS.Screen name="Login" component={Login} />
      <NavAuthS.Screen name="SignUp" component={SignUp} />
    </NavAuthS.Navigator>
  );
}

function HomeTabs() {
  return (
    <TabHome.Navigator>
      <TabHome.Screen name="Map" component={Main} />
      <TabHome.Screen name="Matches" component={Matches} />
      <TabHome.Screen name="Chat" component={Chat} />
    </TabHome.Navigator>
  );
}

function MyMain() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerRight: () => rightHeader(),
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
    </Stack.Navigator>
  );
}

const rightHeader = () => {
  return <OpenSettings />;
};

export const Navigation = () => {
  const user = useUserStore(state => state.user);
  return <>{user ? <MyMain /> : <AuthStack />}</>;
};
