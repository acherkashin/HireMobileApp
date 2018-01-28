import { AppRegistry } from 'react-native';
import App from './App';
import * as mobx from 'mobx';

mobx.useStrict(true) // don't allow state modifications outside actions

mobx.spy((event) => {
    if (event.type === 'action') {
        console.log(`${event.name} with args:`, event.arguments)
    }
})

AppRegistry.registerComponent('HireMobileApp', () => App);
