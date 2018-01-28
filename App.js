/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider as MobXProvider, observer } from 'mobx-react/native';
import RootStore from './Stores/RootStore';
import TabNavBar from './Screens/Navigators/TabNavBar';

@observer
export default class App extends Component {
  render() {
    return (
      <MobXProvider store={new RootStore()}>
        <TabNavBar />
      </MobXProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
