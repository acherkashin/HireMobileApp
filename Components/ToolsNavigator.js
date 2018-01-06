import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Create from './../Screens/Tool/Create';
import AllTools from './../Screens/Tool/AllTools'


export default ToolsNavigator = StackNavigator(
    {
        Create: { screen: Create },
        AllTools: {screen: AllTools},
    },
    {
        initialRouteName: "AllTools",
    }
);