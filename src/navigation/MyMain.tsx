import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Navigation
import { HomeTabs } from './HomeTabs';
// Screens
import { ProfileInfo } from '../screens/ProfileInfo';
import { Settings } from '../screens/Settings';
import { SelectLanguage } from '../screens/SelectLanguage';
// Types
import { NavRoot } from './types';

const Stack = createNativeStackNavigator<NavRoot>();

export function MyMain() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackButtonDisplayMode: 'minimal',
        headerTitleStyle: { color: theme.textPrimary },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
    </Stack.Navigator>
  );
}
