import { StackNavigator } from 'react-navigation';
import { OrderCreateScreen, AllOrdersScreen, OrderScreen } from './../Order/index';
import { SelectToolScreen } from './../Tool';

export default StackNavigator(
    {
        OrderCreateScreen: { screen: OrderCreateScreen },
        AllOrdersScreen: { screen: AllOrdersScreen },
        OrderScreen: { screen: OrderScreen },
        SelectToolScreen: { screen: SelectToolScreen },
    },
    {
        initialRouteName: "AllOrdersScreen",
    }
);