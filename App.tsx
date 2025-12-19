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
// Screeens
import { Main } from './src/screens/Main';
import { Login } from './src/screens/Login';
// Types
import { NavRoot } from './src/navigation/types';

const Stack = createNativeStackNavigator<NavRoot>();

function MyMain() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <MyMain />
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
