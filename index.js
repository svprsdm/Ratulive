/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Home from './Home';
import {name as appName} from './app.json';
import 'react-native-url-polyfill/auto';

AppRegistry.registerComponent(appName, () => Home);
