import * as React from 'react';
import { Button, Text } from 'react-native';
import VenueSuggestion from '../models/VenueSuggestion';
import { CIRCUMCENTER_API_URL } from '../env';

export interface IVenueProps { venueSuggestion: VenueSuggestion; }

export default class VenueSuggestionRow extends React.Component<IVenueProps, {}> {
  get venueSugestion() {
    return this.props.venueSuggestion;
  }

  public endorsePressed = () => {
    fetch(
      `${CIRCUMCENTER_API_URL}/venue_suggestions/` +
      `${this.venueSugestion.id}/endorsements`,
      {
        method: 'POST',
      },
    );
  }

  public vetoPressed = () => {
    fetch(
      `${CIRCUMCENTER_API_URL}/venue_suggestions/${this.venueSugestion.id}/vetoes`,
      {
        method: 'POST',
      },
    );
  }

  public render() {
    return (
      <React.Fragment>
        <Text>{this.venueSugestion.name} - {this.venueSugestion.endorsements}</Text>
        <Button title="Endorse" onPress={this.endorsePressed} />
        <Button title="Veto" onPress={this.vetoPressed} />
      </React.Fragment>
    );
  }
}
