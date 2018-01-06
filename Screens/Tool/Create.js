import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { Icon, Button } from 'react-native-elements';
import ToolStore from './../../Stores/ToolStore';
import { observer } from 'mobx-react';

@observer
export default class ToolCreateScreen extends Component {
    constructor() {
        super();
        this.toolStore = new ToolStore();
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Создать',
    })

    render() {
        return (
            <View style={styles.container}>
                <Text>Tools ${this.toolStore.tools.length}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});