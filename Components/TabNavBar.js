import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToolsNavigator from './ToolsNavigator';
import OrdersNavigator from './OrdersNavigator';

const TabNavBar = TabNavigator({
  Tool: {
    screen: ToolsNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-build' : 'ios-build-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Order: {
    screen: OrdersNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-contacts' : 'ios-contacts-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
    }
  });

export default TabNavBar;