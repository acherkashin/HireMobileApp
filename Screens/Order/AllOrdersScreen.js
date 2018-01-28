import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action } from "mobx";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

const styles = StyleSheet.create({
    addButton: {
        marginRight: 10,
    }
});

@inject('store')
@observer
export default class AllOrdersScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Инструменты',
        headerRight: <TouchableOpacity style={styles.addButton}
            onPress={() => {
                
            }}>
            <Icon
                name='ios-add'
                type='ionicon'
                color='#517fa4'
                size={40}
            />
        </TouchableOpacity>
    });

    constructor() {
        super();
    }

    get orderStore() {
        return this.props.store.orderStore;
    }

    componentDidMount() {
        this.orderStore.loadActiveOrders();
    }

    render() {
        return (
            <View>
                <Text>AllOrdersScreen</Text>
            </View>
        );
    }
}