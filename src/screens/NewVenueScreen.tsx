import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Button, TextInput, View } from 'react-native';
import Styles from '../Styles';
import Event from '../models/Event';

const NEW_VENUE_SCREEN_ROUTE = 'new_venue';

export interface INewVenueScreenNavigationParams { event: Event; }
interface INewVenueScreenState { name: string; }

export default class NewVenueScreen extends React.Component<NavigationScreenProps<INewVenueScreenNavigationParams>, INewVenueScreenState> {
  get event() {
    return this.props.navigation.getParam('event');
  }

  get name() {
    return (this.state || {}).name || '';
  }

  set name(name) {
    this.setState({ name });
  }

  public onChangeText = (text: string) => {
    this.name = text;
  }

  public onPress = async () => {
    await fetch(
      `https://circumcenter.herokuapp.com/api/events/${this.event.id}/venue_suggestions`,
      {
        body: JSON.stringify({
          venue_suggestion: {
            name: this.name,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
    if (this.props.navigation.isFocused()) {
      this.props.navigation.goBack();
    }
  }

  public render() {
    return (
      <View style={Styles.container}>
        <TextInput placeholder="Venue Name" value={this.name} onChangeText={this.onChangeText} />
        <Button title="Recommend" onPress={this.onPress} />
      </View>
    );
  }
}

export { NEW_VENUE_SCREEN_ROUTE };
