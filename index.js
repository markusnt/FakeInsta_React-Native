/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';


import Feed from './src/screens/Feed';
import Login from './src/screens/Login.js';

AppRegistry.registerComponent(appName, () => Login);
