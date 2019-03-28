/** @format */
import 'node-libs-react-native/globals';
import './globals.js';
import {AppRegistry} from 'react-native';
// import App from './App';
import Root from './App';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => Root);
