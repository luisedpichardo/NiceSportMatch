import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Navigation
import { HomeTabs } from './HomeTabs';
// Screens
import { ProfileInfo } from '../screens/ProfileInfo';
import { Settings } from '../screens/Settings';
// Types
import { NavRoot } from './types';

const Stack = createNativeStackNavigator<NavRoot>();

export function MyMain() {
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
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
    </Stack.Navigator>
  );
}
