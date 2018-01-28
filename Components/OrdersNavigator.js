import { StackNavigator } from 'react-navigation';
import OrderCreateScreen from './../Screens/Order/OrderCreateScreen';
import AllOrdersScreen from './../Screens/Order/AllOrdersScreen';
import OrderScreen from './../Screens/Order/OrderScreen';

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