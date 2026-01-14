/**
 * @format
 */

import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Change this to true to see Storybook
const SHOW_STORYBOOK = false;

let EntryPoint = App;

if (SHOW_STORYBOOK) {
  EntryPoint = require('./.rnstorybook/index').default;
}

AppRegistry.registerComponent(appName, () => EntryPoint);
