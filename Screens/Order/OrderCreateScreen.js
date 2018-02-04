import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action } from "mobx";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { TextEditor, LongTextEditor, LabelValue } from './../../Components';

@inject('store')
@observer
export default class OrderCreateScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <TouchableOpacity onPress={params.handleSave ? params.handleSave : () => null}>
                <Text>Готово</Text>
            </TouchableOpacity>
        );

        if (params.isSaving) {
            headerRight = <ActivityIndicator />;
        }

        return ({
            title: 'Создать',
            headerRight: headerRight,
        })
    }

    @observable order = null;

    constructor() {
        super();
    }

    get orderStore() {
        return this.props.store.orderStore;
    }

    _handleSave = () => {
        // Update state, show ActivityIndicator
        this.props.navigation.setParams({ isSaving: true });

        this.order.save().then(() => {
            this.props.navigation.setParams({ isSaving: false });
            // this.props.navigation.navigate('OrderScreen');
        }).catch(() => {
            this.props.navigation.setParams({ isSaving: false });
        });
    }

    @action
    componentDidMount() {
        this.tool = this.orderStore.createOrder();
        // We can only set the function after the component has been initialized
        this.props.navigation.setParams({ handleSave: this._handleSave });
    }

    @action
    componentWillMount() {
        this.order = this.orderStore.createOrder();
    }

    @action.bound
    onClientChanged(clientName) {
        this.order.clientName = clientName;
    }

    @action.bound
    onPhoneChanged(phone) {
        this.order.clientPhoneNumber = phone;
    }

    @action.bound
    onContractNumberChanged(contract) {
        this.order.contractNumber = contract;
    }

    @action.bound
    onPledgeChanged(pledge) {
        this.order.paidPledge = parseFloat(pledge) || 0;
    }

    @action.bound
    onDescriptionChanged(description) {
        this.order.description = description;
    }

    @action.bound
    onToolChanged(tool) {
        this.order.tool = tool;
    }

    selectTool() {
        this.props.navigation.navigate('SelectToolScreen', {
            selectTool: this.onToolChanged
        })
    }

    render() {
        const { clientName, clientPhoneNumber, contractNumber, description, paidPledge } = this.order;

        return (
            <ScrollView onPress={this.selectTool.bind(this)} style={styles.container}>
                <LabelValue label={'Инструмент'} value={this.order.tool && this.order.tool.name || ''} placeholder={'Выберите инструмент'} onPress={this.selectTool.bind(this)} />
                <TextEditor label={'Клиент'} value={clientName} placeholder={'Введите имя клиента ...'} onChangeText={this.onClientChanged} />
                <TextEditor label={'Телефон'} value={clientPhoneNumber} placeholder={'Введите телефон клиента ...'} onChangeText={this.onPhoneChanged} />
                <TextEditor label={'Договор'} value={contractNumber} placeholder={'Введите номер договора ...'} onChangeText={this.onContractNumberChanged} />
                <TextEditor label={'Залог'} value={paidPledge} placeholder={'Введите сумму залога ...'} onChangeText={this.onPledgeChanged} />
                <LongTextEditor label={'Примечание'} value={description} placeholder={'Введите примечание ...'} onChangeText={this.onDescriptionChanged} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    editor: {
        flexDirection: 'row',
    },
    labelContainer: {
        flex: 2,
    },
    inputContainer: {
        flex: 5,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});