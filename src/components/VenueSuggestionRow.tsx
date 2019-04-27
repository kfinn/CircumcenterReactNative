import * as React from 'react';
import { Button, Text } from 'react-native';
import VenueSuggestion from '../models/VenueSuggestion';

export interface IVenueProps { venueSuggestion: VenueSuggestion; }

export default class VenueSuggestionRow extends React.Component<IVenueProps, {}> {
  get venueSugestion() {
    return this.props.venueSuggestion;
  }

  public endorsePressed = () => {
    fetch(
      'https://circumcenter.herokuapp.com/api/venue_suggestions/' +
      `${this.venueSugestion.id}/endorsements`,
      {
        method: 'POST',
      },
    );
  }

  public vetoPressed = () => {
    fetch(
      `https://circumcenter.herokuapp.com/api/venue_suggestions/${this.venueSugestion.id}/vetoes`,
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
