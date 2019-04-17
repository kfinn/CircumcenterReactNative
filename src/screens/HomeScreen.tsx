import * as React from 'react';
import { Button, View } from 'react-native';
import STYLES from '../Styles';
import { NavigationScreenConfigProps } from 'react-navigation';
import { EVENT_SCREEN_ROUTE } from './EventScreen';
import Event from '../models/Event';

const HOME_SCREEN_ROUTE = 'home';

export default class HomeScreen extends React.Component<NavigationScreenConfigProps, {}> {
  public onPress = () => {
    fetch(
      'http://localhost:3000/api/events',
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
    )
      .then(response => response.json())
      .then(json => new Event(json))
      .then((event) => {
        this.props.navigation.push(EVENT_SCREEN_ROUTE, { event: event })
      })
  }

  public render() {
    return (
      <View style={STYLES.container}>
        <Button title="New Event" onPress={this.onPress} />
      </View>
    );
  }
}

export { HOME_SCREEN_ROUTE }
