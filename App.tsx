/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import i18n from './i18n';
// Navigation
import { Navigation } from './src/navigation/navigation';
// Services
import { getPersistedLang } from './src/services/LanguageService';
import { ErrorBoundary } from './src/screens/ErrorBoundary';
// Store
import { userStore } from './src/stores/userStore';
// Utils
import {
  assignUsernameToStore,
  removeUsernameFromStore,
} from './src/utils/AuthHelpers';
import { retrieveDeviceTokenService } from './src/services/TokenNotifService';
import { StatusBar } from 'react-native';
import { useTheme } from './src/hooks/useTheme';

function App() {
  const { colorScheme } = useTheme();

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      if (user) {
        userStore.getState().setUser(user);
        assignUsernameToStore();
        retrieveDeviceTokenService();
      } else {
        userStore.getState().setUser(null);
        removeUsernameFromStore();
      }
    });
    getPersistedLang().then(data => {
      const lang = typeof data === 'string' ? data : data?.languageTag;
      i18n.changeLanguage(lang || 'en');
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
      />
      <ErrorBoundary>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
