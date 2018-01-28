import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action, runInAction } from 'mobx';
import InfoItem from './../../Components/InfoItem';

@inject('store')
@observer
export default class OrderScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <TouchableOpacity onPress={() => {/*navigation.navigate('EditOrderScreen')*/ }}>
                <Text>Изменить</Text>
            </TouchableOpacity>
        );

        return ({
            title: (params.order && params.order.name) || '',
            headerRight,
            headerTitleStyle: {
                fontSize: 14,
            }
        })
    }

    @observable order = null;

    get orderStore() {
        return this.props.store.orderStore;
    }

    componentDidMount() {
        this.orderStore.getById(this.props.navigation.state.params.id).then((order) => {
            this.props.navigation.setParams({ order });

            runInAction(() => {
                this.order = order;
            });
        });
    }


    render() {
        if (!this.order) {
            return <View>
                <ActivityIndicator />
            </View>;
        }

        const {
            tool,
            clientName,
            clientPhoneNumber,
            contractNumber,
            description,
            paidPledge,
            price,
            startDate,
            endDate,
            createdBy,
            payment
        } = this.order;

        return <ScrollView>
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>Информация о заказе</Text>
                </View>
                <View style={styles.infoPanel}>
                    <InfoItem label={'Инструмент'} value={tool.name} />
                    <InfoItem label={'Клиент'} value={clientName} />
                    <InfoItem label={'Телефон клиента'} value={clientPhoneNumber} />
                    <InfoItem label={'Номер договора'} value={contractNumber} />
                    <InfoItem label={'Залог'} value={paidPledge} />
                    <InfoItem label={'Начало аренды'} value={startDate} />
                    <InfoItem label={'Конец аренды'} value={endDate} />
                    <InfoItem label={'Сумма заказа'} value={payment} />
                    <InfoItem label={'Цена'} value={price} />
                    <InfoItem label={'Примечание'} value={description} hideDevider={true} />
                </View>
            </View>
        </ScrollView>;
    }

}

const styles = StyleSheet.create({
    infoPanel: {
        backgroundColor: 'white'
    },
    header: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    },
});