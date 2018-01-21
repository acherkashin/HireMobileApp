import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action } from "mobx";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

@inject('store')
@observer
export default class OrderCreateScreen extends Component {
    render() {
        return (
            <View>
                <Text>OrderCreateScreen</Text>
            </View>
        );
    }
}