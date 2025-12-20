/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
// Screeens
import { Main } from './src/screens/Main';
import { Login } from './src/screens/Login';
import { SignUp } from './src/screens/SignUp';
// Types
import { NavRoot } from './src/navigation/types';
import { Settings } from './src/screens/Settings';

const Stack = createNativeStackNavigator<NavRoot>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function MyMain() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState(null);

  // Handle user state changes
  const handleAuthStateChanged = (user: any) => {
    setUser(user);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        {user ? <MyMain /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
