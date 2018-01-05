import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Create from './../Screens/Tool/Create'

export default ToolsNavigator = StackNavigator(
    {
        Create: { screen: Create },
    },
    {
        initialRouteName: "Create",
    }
);