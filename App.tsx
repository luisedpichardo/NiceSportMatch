/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useEffect } from 'react';
// Navigation
import { Navigation } from './src/navigation/navigation';
// Store
import { useUserStore } from './src/stores/userStore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      useUserStore.getState().setUser(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
