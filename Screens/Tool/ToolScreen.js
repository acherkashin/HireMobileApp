import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';

@inject('store')
@observer
export default class ToolScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <TouchableOpacity onPress={() => {/*navigation.navigate('EditToolScreen')*/ }}>
                <Text>Изменить</Text>
            </TouchableOpacity>
        );

        return ({
            title: (params.tool && params.tool.name) || '',
            headerRight,
        })
    }

    componentDidMount() {
        this.toolStore.getById(this.props.navigation.state.params.id).then((tool) => {
            this.props.navigation.setParams({ tool });
        });
    }

    get toolStore() {
        return this.props.store.toolStore;
    }

    render() {
        return <Text>
            ToolScreen
        </Text>
    };
}