import * as React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import Event from '../models/Event';
import { CIRCUMCENTER_API_URL } from '../env';
import Styles from '../Styles';
import { Location, Permissions } from 'expo';

export interface ICurrentParticipantFormProps { event: Event; }
interface ICurrentParticipantFormState {
  name: string;
  latitude: number;
  longitude: number;
}

export default class CurrentParticipantForm extends React.Component<ICurrentParticipantFormProps, ICurrentParticipantFormState> {
  get event() {
    return this.props.event;
  }

  set name(name) {
    this.setState({ name });
  }

  get name() {
    return (this.state || {}).name || '';
  }

  get latitude() {
    return (this.state || {}).latitude || '';
  }

  get longitude() {
    return (this.state || {}).longitude || '';
  }

  public onNameChangeText = (name: string) => {
    this.name = name
  }

  public updatePressed = () => {
    fetch(
      `${CIRCUMCENTER_API_URL}/events/${this.event.id}/current_participant`,
      {
        body: JSON.stringify({
          current_participant: this.state || {},
        }),
        method: 'PATCH',
        credentials: "same-origin",
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('location permission was not granted')
    }

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    this.setState({ latitude, longitude }, this.updatePressed);
  }

  public render() {
    return (
      <View style={Styles.row}>
        <TextInput value={this.name} placeholder="Name" onChangeText={this.onNameChangeText} />
        <Text>{this.latitude}</Text>
        <Text>{this.longitude}</Text>
        <Button title="Update" onPress={this.updatePressed} />
      </View>
    );
  }
}
