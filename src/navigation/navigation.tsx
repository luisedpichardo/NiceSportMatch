import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// Navigation
import { AuthStack } from './AuthStack';
import { MyMain } from './MyMain';
// Stores
import { userStore } from '../stores/userStore';

// Define Deep Linking Configuration
const linking = {
  prefixes: ['nicesportmatch://', 'https://nicesportmatch.com'],
  // 1. Handle deep link when app is opened from a quit state via notification
  async getInitialURL() {
    // Check if app was opened by a deep link
    const url = await Linking.getInitialURL();
    if (url) return url;
    // Check if app was opened by a Firebase notificFation
    const message = await messaging().getInitialNotification();
    console.log(message?.data?.url);
    return message?.data?.url; // Return the 'url' from your FCM payload
  },
  // 2. Handle deep link when app is in background/foreground
  subscribe(listener) {
    const onReceiveURL = ({ url }) => listener(url);
    const subscription = Linking.addEventListener('url', onReceiveURL);

    // Listen for FCM messages while app is in background
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      remoteMessage => {
        const url = remoteMessage?.data?.url;
        if (url) {
          console.log(url);
          listener(url);
        }
      },
    );

    return () => {
      subscription.remove();
      unsubscribeNotification();
    };
  },
  config: {
    screens: {
      ChatNav: {
        path: 'chatnav',
        initialRouteName: 'Messages',
        screens: {
          Messages: 'messages',
          Chat: 'chat/:someone',
        },
      },
      MatchesNav: {
        path: 'matchesnav',
        initialRouteName: 'Matches',
        screens: {
          Matches: 'matches',
          UpdateMatch: 'matches/:matchId',
        },
      },
      Settings: 'settings',
    },
  },
};

export const Navigation = () => {
  const user = userStore(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const hasHydrated = userStore(state => state.hasHydrated);
  console.log('hydrated', hasHydrated);
  // const [validUser, setValidUser] = useState(null);

  // useEffect(() => {
  //   checkUser();
  // }, []);

  useEffect(() => {
    // Simulate a splash screen/loading check if needed
    const init = async () => {
      // You could do an actual token refresh check here
      setTimeout(() => {
        console.log(user);
        console.log(hasHydrated);
        setIsLoading(false);
      }, 5000);
    };
    init();
  }, []);

  // useEffect(() => {
  //   const getAsync = async () => {
  //     console.log('getting link to');
  //     try {
  //       const initialUrl = await Linking.getInitialURL();
  //       if (initialUrl) {
  //         console.log(initialUrl);
  //       } else {
  //         // Check if app was opened by a Firebase notificFation
  //         const message = await messaging().getInitialNotification();
  //         // return message?.data?.url; // Return the 'url' from your FCM payload
  //         console.log(message?.data?.url);
  //         // throw new Error('could not retrieve initial');
  //       }
  //     } catch (e) {
  //       console.warn(e.message);
  //     }
  //   };
  //   getAsync();
  // }, []);

  // const checkUser = async () => {
  //   try {
  //     if (user) {
  //       setValidUser(user);
  //     }
  //   } catch (e) {
  //     console.error('Failed to load user', e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (isLoading) {
    console.log('LOADING THIS THING');
    return <Text>Loading</Text>;
  }
  console.log('now actual');
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading</Text>}>
      {user ? <MyMain /> : <AuthStack />}
    </NavigationContainer>
  );
};
