import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { observable, action, runInAction } from 'mobx';
import InfoItem from './../../Components/InfoItem';

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
            headerTitleStyle: {
                fontSize: 14,
            }
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
                    <View style={styles.header}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <View style={styles.infoPanel}>
                        <InfoItem label={'Цена'} value={price} />
                        <InfoItem label={'Залог'} value={pledge} />
                        <InfoItem label={'За сутки'} value={dayPrice} />
                        <InfoItem label={'За смену'} value={workShiftPrice} />
                        <InfoItem label={'Описание'} value={description} hideDevider={true} />
                    </View>
                </View>
            </View>
        </ScrollView>
    };
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