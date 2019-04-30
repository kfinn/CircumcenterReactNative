import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { View } from 'react-native';
import Styles from '../Styles';
import Event from '../models/Event';
import { GooglePlacesAutocomplete, GooglePlacesAutocompletePrediction } from 'react-native-google-places-autocomplete';
import { CIRCUMCENTER_API_URL, GOOGLE_PLACES_API_KEY } from '../env';

const NEW_VENUE_SCREEN_ROUTE = 'new_venue';

export interface INewVenueScreenNavigationParams { event: Event; }

export default class NewVenueScreen extends React.Component<NavigationScreenProps<INewVenueScreenNavigationParams>, {}> {
  get event() {
    return this.props.navigation.getParam('event');
  }

  public onPress = async (data: GooglePlacesAutocompletePrediction) => {
    try {
      await fetch(
        `${CIRCUMCENTER_API_URL}/events/${this.event.id}/venue_suggestions`,
        {
          body: JSON.stringify({
            venue_suggestion: {
              google_place_id: data.place_id,
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
    } catch(error) {
      console.log(error);
    }
  }

  public render() {
    return (
      <View style={Styles.container}>
        <GooglePlacesAutocomplete
          onPress={this.onPress}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            types: 'establishment',
          }}
          styles={{ textInputContainer: { width: '100%' } }}
        />
      </View>
    );
  }
}

export { NEW_VENUE_SCREEN_ROUTE };
