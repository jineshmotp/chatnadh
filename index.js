import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './store';

AppRegistry.registerComponent(appName, () => App);
