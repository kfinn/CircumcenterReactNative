import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation';
import CircumcenterResponse from '../models/CircumcenterResponse';
import Event from '../models/Event';
import Styles from '../Styles';
import { EVENT_SCREEN_ROUTE } from './EventScreen';
import { CIRCUMCENTER_API_URL } from '../env';

const HOME_SCREEN_ROUTE = 'home';

export default class HomeScreen extends React.Component<NavigationScreenConfigProps, {}> {
  public onPress = async () => {
    const response = await CircumcenterResponse(fetch(
      `${CIRCUMCENTER_API_URL}/events`,
      {
        body: JSON.stringify({
          event: {
            start: '2019-05-01 12:00:00-04:00',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    ));
    this.props.navigation.navigate(EVENT_SCREEN_ROUTE, { event: new Event(response) });
  }

  public render() {
    return (
      <View style={Styles.container}>
        <Button title="New Event" onPress={this.onPress} />
      </View>
    );
  }
}

export { HOME_SCREEN_ROUTE };
