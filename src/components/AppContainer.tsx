import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen, { HOME_SCREEN_ROUTE } from './HomeScreen';
import EventScreen, { EVENT_SCREEN_ROUTE }  from './EventScreen';

const appNavigator = createStackNavigator(
  {
    [HOME_SCREEN_ROUTE]: HomeScreen,
    [EVENT_SCREEN_ROUTE]: EventScreen
  },
  {
    initialRouteName: HOME_SCREEN_ROUTE
  }
);

export default createAppContainer(appNavigator);
