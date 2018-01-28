import { StackNavigator } from 'react-navigation';
import OrderCreateScreen from './../Screens/Order/OrderCreateScreen';
import AllOrdersScreen from './../Screens/Order/AllOrdersScreen';

export default StackNavigator(
    {
        OrderCreateScreen: { screen: OrderCreateScreen },
        AllOrdersScreen: { screen: AllOrdersScreen }
    },
    {
        initialRouteName: "AllOrdersScreen",
    }
);