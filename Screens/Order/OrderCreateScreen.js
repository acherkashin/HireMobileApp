import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action } from "mobx";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { TextEditor } from './../../Components';

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

    @action componentWillMount() {
        this.order = this.orderStore.createOrder();
    }

    @action.bound
    onClientChanged(clientName) {
        this.order.clientName = clientName;
    }

    @action.bound
    onPhoneChanged(phone) {
        this.order.phone = phone;
    }

    @action.bound
    onContractNumberChanged(contract) {
        this.order.contractNumber = contract;
    }

    @action.bound
    onPledgeChanged(pledge) {
        this.order.paidPledge = pledge;
    }

    @action.bound
    onDescriptionChanged(description) {
        this.order.description = description;
    }

    render() {
        const { clientName, clientPhoneNumber, contractNumber, description, paidPledge } = this.order;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.editor}>
                    <FormLabel containerStyle={styles.labelContainer}>Инструмент</FormLabel>
                    {/* <FormInput containerStyle={styles.inputContainer} onChangeText={this.onTextChanged} value={name} placeholder={'Введите наименование товара...'} /> */}
                    {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
                </View>

                <TextEditor label={'Клиент'} value={clientName} placeholder={'Введите имя клиента ...'} onChangeText={this.onClientChanged} />
                <TextEditor label={'Телефон'} value={clientPhoneNumber} placeholder={'Введите телефон клиента ...'} onChangeText={this.onPhoneChanged} />
                <TextEditor label={'Договор'} value={contractNumber} placeholder={'Введите номер договора ...'} onChangeText={this.onContractNumberChanged} />
                <TextEditor label={'Залог'} value={paidPledge} placeholder={'Введите сумму залога ...'} onChangeText={this.onPledgeChanged} />

                <View>
                    <FormLabel>Примечание</FormLabel>
                    <FormInput containerStyle={styles.inputContainer}
                        value={description}
                        placeholder={'Введите примечание ...'}
                        onChangeText={this.onDescriptionChanged}
                        multiline={true}
                    />
                    {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
                </View>
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

    inputContainer: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});