import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action } from "mobx";
import { SearchBar, List, ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
    addButton: {
        marginRight: 10,
    }
});

@inject('store')
@observer
export default class AllOrdersScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Активные заказы',
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

    onOrderPress(order) {
        this.props.navigation.navigate('OrderScreen', { id: order.id });
    }

    @action onChangeText(text) {
        this.orderStore.searchString = text;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    round
                    lightTheme
                    onChangeText={this.onChangeText.bind(this)}
                    onClearText={this.onChangeText.bind(this)}
                    icon={{ type: 'font-awesome', name: 'search' }}
                    placeholder='Type Here...' />
                <List containerStyle={{ flex: 1, marginTop: 0 }}>
                    <FlatList
                        data={this.orderStore.filteredOrders}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (<ListItem
                            roundAvatar
                            title={item.tool.name}
                            subtitle={`${item.clientName} (${item.clientPhoneNumber})`}
                            onPress={() => { this.onOrderPress(item) }}
                        />)} />
                </List>
            </View>
        );
    }
}