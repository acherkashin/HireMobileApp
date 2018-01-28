import { StackNavigator } from 'react-navigation';
import { ToolCreateScreen, AllToolsScreen, ToolScreen } from './../Tool';

export default ToolsNavigator = StackNavigator(
    {
        ToolCreateScreen: { screen: ToolCreateScreen },
        AllToolsScreen: { screen: AllToolsScreen },
        ToolScreen: {
            screen: ToolScreen,
            path: 'tool/:id',
        },
    },
    {
        initialRouteName: "AllToolsScreen",
    }
);