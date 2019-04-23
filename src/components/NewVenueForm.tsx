import * as React from 'react';
import { Button, TextInput } from "react-native";
import Event from '../models/Event';

export interface INewVenueFormParams { event: Event };
interface INewVenueFormState { name: string };

export default class NewVenueForm extends React.Component<INewVenueFormParams, INewVenueFormState> {
  get event() {
    return this.props.event;
  }

  get name() {
    return (this.state || {}).name || '';
  }

  set name(name) {
    this.setState({ name: name });
  }

  public onChangeText = (text: string) => {
    this.name = text
  }

  public onPress = () => {
    fetch(
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
    ).then(() => { this.name = '' });
  }

  public render() {
    return (
      <React.Fragment>
        <TextInput placeholder="Venue Name" value={this.name} onChangeText={this.onChangeText} />
        <Button title="Recommend" onPress={this.onPress} />
      </React.Fragment>
    )
  }
}
