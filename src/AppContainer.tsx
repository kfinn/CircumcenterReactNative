import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';

const appNavigator = createStackNavigator({
  home: {
    screen: HomeScreen,
  },
});

export default createAppContainer(appNavigator);
