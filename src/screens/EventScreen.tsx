import * as React from 'react';
import { View, Text, Button } from 'react-native';
import STYLES from '../Styles';
import { NavigationScreenProps } from 'react-navigation';
import Event from '../models/Event';
import { observer } from 'mobx-react';

const EVENT_SCREEN_ROUTE = 'event';

export interface EventScreenNavigationParams { event: Event }

class EventScreen extends React.Component<NavigationScreenProps<EventScreenNavigationParams>, {}> {
  get event() {
    return this.props.navigation.getParam('event')
  }

  onPress = () => {
    fetch(
      `http://localhost:3000/api/events/${this.event.id}/event_venue_recommendations`,
      {
        body: JSON.stringify({
          recommendation: {
            venue_attributes: {
              name: "blah blah blah"
            }
          }
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )
      .then(() => fetch(`http://localhost:3000/api/events/${this.event.id}`))
      .then(response => response.json())
      .then((responseJson) => {
        this.event.merge(responseJson)
      })
  }

  public render() {
    return (
      <View style={STYLES.container}>
        <Text>{this.event.id}</Text>
        <Text>{this.event.start.format()}</Text>
        <Text>{this.event.start.fromNow()}</Text>
        {
          this.event.venues.map(venue => <Text key={venue.id}>{venue.name} - {venue.recommendations}</Text>)
        }
        <Button title="Recommend a Venue" onPress={this.onPress} />
      </View>
    );
  }
}

export default observer(EventScreen);

export { EVENT_SCREEN_ROUTE }
