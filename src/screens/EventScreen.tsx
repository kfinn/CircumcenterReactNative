import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import Event from '../models/Event';
import Styles from '../Styles';
import VenueSuggestionRow from '../components/VenueSuggestionRow';

const EVENT_SCREEN_ROUTE = 'event';

export interface IEventScreenNavigationParams { event: Event; }

class EventScreen extends React.Component<NavigationScreenProps<IEventScreenNavigationParams>, {}> {
  get event() {
    return this.props.navigation.getParam('event');
  }

  public componentDidMount() {
    this.event.subscribe();
  }

  public componentWillUnmount() {
    this.event.unsubscribe();
  }

  public onPress = () => {
    fetch(
      `http://localhost:3000/api/events/${this.event.id}/venue_suggestions`,
      {
        body: JSON.stringify({
          venue_suggestion: {
            name: 'blah blah blah'
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
  }

  public render() {
    return (
      <View style={Styles.container}>
        <Text>{this.event.id}</Text>
        <Text>{this.event.start.format()}</Text>
        <Text>{this.event.start.fromNow()}</Text>
        {
          this.event.venueSuggestions.map((venueSuggestion) => {
            return <VenueSuggestionRow key={venueSuggestion.id} venueSuggestion={venueSuggestion} />;
          })
        }
        <Button title="Recommend a Venue" onPress={this.onPress} />
      </View>
    );
  }
}

export default observer(EventScreen);

export { EVENT_SCREEN_ROUTE };
