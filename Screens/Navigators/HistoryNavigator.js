import { StackNavigator } from 'react-navigation';
import { OrderCreateScreen, HistoryScreen, OrderScreen } from './../Order/index';
import { SelectToolScreen } from './../Tool';

export default StackNavigator(
    {
        HistoryScreen: { screen: HistoryScreen },
        OrderScreen: { screen: OrderScreen }            
    },
    {
        initialRouteName: "HistoryScreen",
    }
);