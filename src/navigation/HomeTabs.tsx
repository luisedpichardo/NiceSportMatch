import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Navigation
import { MatchSatck } from './MatchStack';
import { MessageStack } from './MessageStack';
// Screens
import { Main } from '../screens/Main';
// Types
import { NavHomeTab } from './types';

const TabHome = createBottomTabNavigator<NavHomeTab>();

function tabIcon(focused: any, uri: any) {
  return (
    <Image
      source={uri} // same icon for both iOS and Android
      style={{
        width: 30,
        height: 30,
        tintColor: focused ? 'green' : 'gray', // optional: change color when focused
      }}
    />
  );
}

export function HomeTabs() {
  return (
    <TabHome.Navigator
      screenOptions={{ tabBarActiveTintColor: 'green', headerShown: false }}
      initialRouteName="Map"
    >
      <TabHome.Screen
        name="MatchesNav"
        component={MatchSatck}
        options={{
          title: 'Matches',
          tabBarIcon: ({ focused }) =>
            tabIcon(focused, require('../../assets/trophy.png')),
        }}
      />
      <TabHome.Screen
        name="Map"
        component={Main}
        options={{
          tabBarIcon: ({ focused }) =>
            tabIcon(focused, require('../../assets/map.png')),
        }}
      />
      <TabHome.Screen
        name="ChatNav"
        component={MessageStack}
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) =>
            tabIcon(focused, require('../../assets/message-circle.png')),
        }}
      />
    </TabHome.Navigator>
  );
}
