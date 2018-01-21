import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Create from './../Screens/Tool/Create';
import AllTools from './../Screens/Tool/AllTools'
import ToolScreen from './../Screens/Tool/ToolScreen';

export default ToolsNavigator = StackNavigator(
    {
        Create: { screen: Create },
        AllTools: { screen: AllTools },
        ToolScreen: {
            screen: ToolScreen,
            path: 'tool/:id',
        },
    },
    {
        initialRouteName: "AllTools",
    }
);