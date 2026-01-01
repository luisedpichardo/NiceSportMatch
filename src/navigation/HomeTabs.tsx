import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
// Navigation
import { MatchSatck } from './MatchStack';
import { MessageStack } from './MessageStack';
// Screens
import { Main } from '../screens/Main';
// Types
import { NavHomeTab } from './types';

const TabHome = createBottomTabNavigator<NavHomeTab>();

function tabIcon(focused: boolean, uri: ImageSourcePropType) {
  return (
    <Image
      source={uri}
      style={{
        width: 35,
        height: 35,
        tintColor: focused ? 'green' : 'gray',
      }}
    />
  );
}

type Props = BottomTabBarButtonProps;
const MapTabButton = (props: Props) => {
  const { delayLongPress, ref, ...rest } = props;
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.custBtn,
        styles.shadow,
        pressed && { transform: [{ scale: 0.8 }] },
      ]}
    >
      <Image source={require('../../assets/map.png')} style={styles.custImg} />
    </Pressable>
  );
};

export function HomeTabs() {
  const { t } = useTranslation();
  return (
    <TabHome.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',
        headerShown: false,
        tabBarStyle: { ...styles.bottomTab, ...styles.shadow },
        tabBarLabelStyle: styles.labelStyle,
      }}
      initialRouteName="Map"
    >
      <TabHome.Screen
        name="MatchesNav"
        component={MatchSatck}
        options={({ route }) => {
          // Get the current nested route inside the stack
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Matches';
          return {
            tabBarLabel: t('home-tabs.match-stack.tab-bar-label'),
            tabBarIcon: ({ focused }) =>
              tabIcon(focused, require('../../assets/trophy.png')),
            tabBarStyle:
              routeName === 'Matches'
                ? { ...styles.bottomTab, ...styles.shadow }
                : { display: 'none' },
          };
        }}
      />
      <TabHome.Screen
        name="Map"
        component={Main}
        options={{
          tabBarLabel: '',
          tabBarButton: props => <MapTabButton {...props} />,
        }}
      />
      <TabHome.Screen
        name="ChatNav"
        component={MessageStack}
        options={({ route }) => {
          // Get the current nested route inside the stack
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Messages';
          return {
            tabBarLabel: 'MESSAGES',
            tabBarIcon: ({ focused }) =>
              tabIcon(focused, require('../../assets/message-circle.png')),
            tabBarStyle:
              routeName === 'Messages'
                ? { ...styles.bottomTab, ...styles.shadow }
                : { display: 'none' },
          };
        }}
      />
    </TabHome.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    position: 'absolute',
    width: '80%',
    marginHorizontal: '10%',
    paddingTop: 10,
    marginVertical: '2%',
    backgroundColor: 'white',
    borderRadius: 20,
    bottom: 20,
    height: 80,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  labelStyle: {
    paddingVertical: 10,
    fontSize: 15,
  },
  custBtn: {
    top: -40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  custImg: {
    width: 35,
    height: 35,
    tintColor: 'white',
    alignSelf: 'center',
  },
});
