import { StackNavigator } from 'react-navigation';
import { OrderCreateScreen, AllOrdersScreen, OrderScreen } from './../Order/index';

export default StackNavigator(
    {
        OrderCreateScreen: { screen: OrderCreateScreen },
        AllOrdersScreen: { screen: AllOrdersScreen },
        OrderScreen: { screen: OrderScreen },
    },
    {
        initialRouteName: "AllOrdersScreen",
    }
);