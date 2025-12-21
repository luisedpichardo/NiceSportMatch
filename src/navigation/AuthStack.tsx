import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import { Login } from '../screens/Login';
import { SignUp } from '../screens/SignUp';
// Types
import { NavAuthStack } from './types';

const NavAuthS = createNativeStackNavigator<NavAuthStack>();

export function AuthStack() {
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
