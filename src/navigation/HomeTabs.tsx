import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { Platform } from 'react-native';
// Navigation
import { MatchSatck } from './MatchStack';
// Screens
import { Main } from '../screens/Main';
import { Chat } from '../screens/Chat';
// Types
import { NavHomeTab } from './types';

const TabHome = createNativeBottomTabNavigator<NavHomeTab>();

function nativeTabIcon(
  ios: { focused?: string; unfocused: string },
  android: string,
) {
  if (Platform.OS === 'ios') {
    return ({ focused }: { focused: boolean }) => ({
      type: 'sfSymbol' as const,
      name: focused && ios.focused ? ios.focused : ios.unfocused,
    });
  }
  return () => ({
    type: 'drawableResource' as const,
    name: android,
  });
}

export function HomeTabs() {
  return (
    <TabHome.Navigator>
      <TabHome.Screen
        name="MatchesNav"
        component={MatchSatck}
        options={{
          tabBarIcon: nativeTabIcon(
            { focused: 'trophy.fill', unfocused: 'trophy' },
            'ic_trophy',
          ),
        }}
      />
      <TabHome.Screen
        name="Map"
        component={Main}
        options={{
          tabBarIcon: nativeTabIcon(
            { focused: 'map.fill', unfocused: 'map' },
            'ic_map',
          ),
        }}
      />
      <TabHome.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: nativeTabIcon(
            { focused: 'message.fill', unfocused: 'message' },
            'ic_chat',
          ),
        }}
      />
    </TabHome.Navigator>
  );
}
