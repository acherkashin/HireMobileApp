import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon, Button} from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action } from "mobx";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

@inject('store')
@observer
export default class ToolCreateScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <TouchableOpacity style={styles.addButton} onPress={params.handleSave ? params.handleSave : () => null}>
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

    @observable tool = null;

    constructor() {
        super();
    }

    get toolStore() {
        return this.props.store.toolStore;
    }

    _handleSave = () => {
        // Update state, show ActivityIndicator
        this.props.navigation.setParams({ isSaving: true });

        // Fictional function to save information in a store somewhere
        this.tool.save().then(() => {
            this.props.navigation.setParams({ isSaving: false });
            this.props.navigation.navigate('ToolScreen');
        }).catch(() => {
            this.props.navigation.setParams({ isSaving: false });
        })
    }

    @action
    componentDidMount() {
        this.tool = this.toolStore.createTool();
        // We can only set the function after the component has been initialized
        this.props.navigation.setParams({ handleSave: this._handleSave });
    }

    render() {
        if (!this.tool) {
            return <View></View>;
        }

        const { name, description, price, pledge, dayPrice, workShiftPrice } = this.tool;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <FormLabel>Наименование</FormLabel>
                        <FormInput onChangeText={this.onTextChanged} value={name} placeholder={'Введите наименование товара...'} />
                        {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
                    </View>
                    <View>
                        <FormLabel>Описание</FormLabel>
                        <FormInput
                            value={description}
                            placeholder={'Введите описание товара...'}
                            onChangeText={this.onDescriptionChanged}
                            multiline={true}
                        />
                        {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
                    </View>
                    <View>
                        <FormLabel>Цена</FormLabel>
                        <FormInput
                            value={`${price}`}
                            placeholder={'Введите цену...'}
                            keyboardType={'numeric'}
                            onChangeText={this.onPriceChanged}
                        />
                        {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
                    </View>
                    <View>
                        <FormLabel>Залог</FormLabel>
                        <FormInput
                            value={`${pledge}`}
                            keyboardType={'numeric'}
                            placeholder={'Введите размер залога...'}
                            onChangeText={this.onPladgeChanged}
                        />
                        {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
                    </View>
                    <View>
                        <FormLabel>За сутки</FormLabel>
                        <FormInput
                            value={`${dayPrice}`}
                            keyboardType={'numeric'}
                            placeholder={'Введите цену за сутки...'}
                            onChangeText={this.onDayPriceChanged}
                        />
                        {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
                    </View>
                    <View>
                        <FormLabel>За смену</FormLabel>
                        <FormInput
                            value={`${workShiftPrice}`}
                            keyboardType={'numeric'}
                            placeholder={'Введите цену за смену...'}
                            onChangeText={this.onWorkShiftPriceChanged}
                        />
                        {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}
                    </View>
                </View>
            </ScrollView>
        );
    }

    @action.bound
    onTextChanged(name) {
        this.tool.name = name;
    }

    @action.bound
    onDescriptionChanged(description) {
        this.tool.description = description;
    }

    @action.bound
    onPriceChanged(price) {
        this.tool.price = price;
    }

    @action.bound
    onPladgeChanged(pladge) {
        this.tool.pladge = pladge;
    }

    @action.bound
    onDayPriceChanged(price) {
        this.tool.price = price;
    }

    @action.bound
    onWorkShiftPriceChanged(workShiftPrice) {
        this.tool.workShiftPrice = workShiftPrice;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
});