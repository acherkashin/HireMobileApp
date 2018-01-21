import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action, runInAction } from 'mobx';

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

    @observable tool = null;

    componentDidMount() {
        this.toolStore.getById(this.props.navigation.state.params.id).then((tool) => {
            this.props.navigation.setParams({ tool });

            runInAction(() => {
                this.tool = tool;
            });
        });
    }

    get toolStore() {
        return this.props.store.toolStore;
    }

    render() {
        if (!this.tool) {
            return <View>
                <ActivityIndicator />
            </View>
        }

        const { name, description, price, pledge, dayPrice, workShiftPrice } = this.tool;

        return <ScrollView>
            <View>
                <View>
                    <Text>{this.tool.name}</Text>
                    <InfoItem label={'Цена'} value={price} />
                    <InfoItem label={'Залог'} value={pledge} />
                    <InfoItem label={'За сутки'} value={dayPrice} />
                    <InfoItem label={'За смену'} value={workShiftPrice} />
                    <View>
                        <Text>Описание: </Text>
                        <Text>{description}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    };
}

const InfoItem = ({ label, value }) => (
    <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold' }}>{label}: </Text>
        <Text>{value}</Text>
    </View>
);