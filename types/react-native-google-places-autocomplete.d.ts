import * as React from 'react';
import { string } from 'prop-types';
import { ViewStyle } from 'react-native';

export class GooglePlacesAutocompletePrediction {
  description: string;
  place_id: string;
}

export interface IGooglePlacesAutocompleteProps {
  onPress?: (data: GooglePlacesAutocompletePrediction) => any;
  fetchDetails?: boolean;
  query: {
    key: string;
    types?: string;
  };
  styles?: {
    textInputContainer?: ViewStyle;
  }
}
export const GooglePlacesAutocomplete: React.ComponentType<IGooglePlacesAutocompleteProps>;
