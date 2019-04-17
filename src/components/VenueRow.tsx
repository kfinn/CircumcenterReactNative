import React, { Component, Fragment } from "react";
import { Text, Button } from "react-native";
import Venue from "../models/Venue";

export interface IVenueProps { venue: Venue };

export default class VenueRow extends Component<IVenueProps, {}> {
  get venue() {
    return this.props.venue
  }

  public recommendPressed = () => {
    fetch(
      `http://localhost:3000/api/events/${this.venue.event.id}/venues/${this.venue.id}/recommendations`,
      {
        method: 'POST',
      },
    )
  }

  public render() {
    return (
      <Fragment>
        <Text>{this.venue.name} - {this.venue.recommendations}</Text>
        <Button title="Recommend" onPress={this.recommendPressed} />
      </Fragment>
    );
  }
}
