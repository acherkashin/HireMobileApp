import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { Icon, Button, List, ListItem } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';

const styles = StyleSheet.create({
    addButton: {
        marginRight: 10,
    }
});

@inject('store') @observer
export default class AllToolsScreen extends Component {
    constructor() {
        super();
    }

    get toolStore() {
        return this.props.store.toolStore;
    }

    componentDidMount() {
        this.toolStore.loadTools();
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Инструменты',
        headerRight: <TouchableOpacity style={styles.addButton}
            onPress={() => {
                navigation.navigate('Create')
            }}>
            <Icon
                name='ios-add'
                type='ionicon'
                color='#517fa4'
                size={40}
            />
        </TouchableOpacity>
    })

    render() {
        if (this.toolStore.isLoading) {
            return (<Text>Загрузка ...</Text>)
        } else {
            return (
                <List containerStyle={{ flex: 1, marginTop: 0 }}>
                    <FlatList
                        data={this.toolStore.tools}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (<ListItem
                            roundAvatar
                            title={item.name}
                            subtitle={`Цена: ${item.price}`}
                        />)} />
                </List>
            );
        }

        console.log('AllTools rendered');
    }
}