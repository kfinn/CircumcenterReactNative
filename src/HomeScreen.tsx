import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class HomeScreen extends React.Component {
  public onPress = () => {
    fetch(
      'http://localhost:3000/api/events',
      {
        body: JSON.stringify({
          event: {
            start: '2019-05-01 12:00:00',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )
      .then(response => response.json())
      .then(console.log);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Button title="New Event" onPress={this.onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
