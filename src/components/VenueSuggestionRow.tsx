import React, { Component, Fragment } from "react";
import { Text, Button } from "react-native";
import VenueSuggestion from "../models/VenueSuggestion";

export interface IVenueProps { venueSuggestion: VenueSuggestion };

export default class VenueSuggestionRow extends Component<IVenueProps, {}> {
  get venueSugestion() {
    return this.props.venueSuggestion
  }

  public endorsePressed = () => {
    fetch(
      `http://localhost:3000/api/venue_suggestions/${this.venueSugestion.id}/endorsements`,
      {
        method: 'POST',
      },
    )
  }

  public vetoPressed = () => {
    fetch(
      `http://localhost:3000/api/venue_suggestions/${this.venueSugestion.id}/vetoes`,
      {
        method: 'POST',
      },
    )
  }

  public render() {
    return (
      <Fragment>
        <Text>{this.venueSugestion.name} - {this.venueSugestion.endorsements}</Text>
        <Button title="Endorse" onPress={this.endorsePressed} />
        <Button title="Veto" onPress={this.vetoPressed} />
      </Fragment>
    );
  }
}
