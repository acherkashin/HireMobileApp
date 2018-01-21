import { StackNavigator } from 'react-navigation';
import OrderCreateScreen from './../Screens/Order/OrderCreateScreen';

export default StackNavigator(
    {
        OrderCreateScreen: { screen: OrderCreateScreen },
    },
    {
        initialRouteName: "OrderCreateScreen",
    }
);