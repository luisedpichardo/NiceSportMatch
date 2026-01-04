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

function App() {
  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      if (user) {
        userStore.getState().setUser(user);
        assignUsernameToStore();
      } else {
        userStore.getState().setUser(null);
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
      <ErrorBoundary>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
