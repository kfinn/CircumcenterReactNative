import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import VenueSuggestionRow from '../components/VenueSuggestionRow';
import Event from '../models/Event';
import Styles from '../Styles';
import { NEW_VENUE_SCREEN_ROUTE } from './NewVenueScreen';

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

  public onPressNewVenue = () => {
    this.props.navigation.navigate(NEW_VENUE_SCREEN_ROUTE, { event: this.event });
  }

  public render() {
    return (
      <View style={Styles.container}>
        <Text>{this.event.id}</Text>
        <Text>{this.event.start.format()}</Text>
        <Text>{this.event.start.fromNow()}</Text>
        {
          this.event.venueSuggestions.map((venueSuggestion) => {
            return <VenueSuggestionRow
              key={venueSuggestion.id}
              venueSuggestion={venueSuggestion}
            />;
          })
        }
        <Button title="New Venue" onPress={this.onPressNewVenue} />
      </View>
    );
  }
}

export default observer(EventScreen);

export { EVENT_SCREEN_ROUTE };
