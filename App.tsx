/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import i18n from './i18n';
// Navigation
import { Navigation } from './src/navigation/navigation';
// Services
import { getPersistedLang } from './src/services/LanguageService';
// Store
import { useStore } from './src/stores/userStore';
import {
  assignUsernameToStore,
  removeUsernameFromStore,
} from './src/utils/AuthHelpers';
import { ErrorBoundary } from './src/screens/ErrorBoundary';

function App() {
  const isDarkMode = useColorScheme() !== 'dark';

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      if (user) {
        useStore.getState().setUser(user);
        assignUsernameToStore();
      } else {
        useStore.getState().setUser(null);
        removeUsernameFromStore();
      }
    });
    getPersistedLang().then(data => {
      i18n.changeLanguage(data || '');
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ErrorBoundary>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
