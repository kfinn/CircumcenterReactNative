import camelize from 'camelize';
import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation';
import Event from '../models/Event';
import Styles from '../Styles';
import { EVENT_SCREEN_ROUTE } from './EventScreen';

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
      .then(camelize)
      .then(json => new Event(json))
      .then((event) => {
        this.props.navigation.push(EVENT_SCREEN_ROUTE, { event });
      });
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
