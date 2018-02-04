import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { Icon, List, ListItem } from 'react-native-elements';
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

    componentWillMount() {
        this.toolStore.loadTools();
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Инструменты',
        headerRight: <TouchableOpacity style={styles.addButton}
            onPress={() => {
                navigation.navigate('ToolCreateScreen')
            }}>
            <Icon
                name='ios-add'
                type='ionicon'
                color='#517fa4'
                size={40}
            />
        </TouchableOpacity>
    });

    onRefresh = () => {
        this.toolStore.loadTools();
    }

    noComponents = () => {
        let text = "Инструменты не найдены";

        if (this.toolStore.isLoading) {
            text = "Загрузка...";
        }

        return <View>
            <Text>{text}</Text>
        </View>;
    }

    onToolPress(tool) {
        this.props.navigation.navigate('ToolScreen', { id: tool.id });
    }

    render() {
        return (
            <List containerStyle={{ flex: 1, marginTop: 0 }}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    refreshing={this.toolStore.isLoading}
                    onRefresh={() => this.onRefresh()}
                    ListEmptyComponent={this.noComponents}
                    renderItem={({ item }) => (<ListItem
                        roundAvatar
                        title={item.name}
                        subtitle={`Цена: ${item.price}`}
                        onPress={() => { this.onToolPress(item) }}
                    />)}
                />
            </List>
        );
    }
}