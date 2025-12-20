/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
// Screeens
import { Main } from './src/screens/Main';
import { Login } from './src/screens/Login';
import { SignUp } from './src/screens/SignUp';
// Types
import { NavRoot, NavAuthStack, NavHomeTab } from './src/navigation/types';
import { Settings } from './src/screens/Settings';
import { RightHdrBtn } from './src/components/RightHdrBtn';

const Stack = createNativeStackNavigator<NavRoot>();
const NavAuthS = createNativeStackNavigator<NavAuthStack>();
const TabHome = createNativeBottomTabNavigator<NavHomeTab>();

function AuthStack() {
  return (
    <NavAuthS.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <NavAuthS.Screen name="Login" component={Login} />
      <NavAuthS.Screen name="SignUp" component={SignUp} />
    </NavAuthS.Navigator>
  );
}

function HomeTabs() {
  return (
    <TabHome.Navigator>
      <TabHome.Screen name="Main" component={Main} />
    </TabHome.Navigator>
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
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerRight: () => rightHeader(),
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

const rightHeader = () => {
  const navigation = useNavigation();
  return (
    <RightHdrBtn
      text="Settings"
      onPress={() => navigation.navigate('Settings')}
    />
  );
};

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
