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

export function HomeTabs() {
  return (
    <TabHome.Navigator>
      <TabHome.Screen
        name="Matches"
        component={MatchSatck}
        options={
          Platform.OS === 'ios'
            ? {
                tabBarIcon: ({ focused }) => ({
                  type: 'sfSymbol',
                  name: focused ? 'trophy.fill' : 'trophy',
                }),
              }
            : {
                tabBarIcon: () => ({
                  type: 'material',
                  name: 'emoji-events', // Material equivalent of trophy
                }),
              }
        }
      />
      <TabHome.Screen
        name="Map"
        component={Main}
        options={
          Platform.OS === 'ios'
            ? {
                tabBarIcon: ({ focused }) => ({
                  type: 'sfSymbol',
                  name: focused ? 'map.fill' : 'map',
                }),
              }
            : {
                tabBarIcon: () => ({
                  type: 'material',
                  name: 'map',
                }),
              }
        }
      />
      <TabHome.Screen
        name="Chat"
        component={Chat}
        options={
          Platform.OS === 'ios'
            ? {
                tabBarIcon: ({ focused }) => ({
                  type: 'sfSymbol',
                  name: focused ? 'message.fill' : 'message',
                }),
              }
            : {
                tabBarIcon: () => ({
                  type: 'material',
                  name: 'chat',
                }),
              }
        }
      />
    </TabHome.Navigator>
  );
}
