import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  addNavigationHelpers,
  StackNavigator,
  NavigationActions
} from "react-navigation";

import { observable, action } from "mobx";
import { observer } from "mobx-react";

class NavigationStore {
  @observable.ref navigationState = {
    index: 0,
    routes: [
      {
        key: "Login",
        routeName: "Login",
        params: { title: "Login" }
      }
    ]
  };

  @action dispatch = (action, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null;
    return (this.navigationState = RootNavigator.router.getStateForAction(
      action,
      previousNavState
    ));
  };
}