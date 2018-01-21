import { AppRegistry } from 'react-native';
import App from './App';
import * as mobx from 'mobx';

mobx.useStrict(true) // don't allow state modifications outside actions

AppRegistry.registerComponent('HireMobileApp', () => App);
