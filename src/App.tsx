import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default class App extends React.Component {
  onPress = () => {
    fetch(
      "http://localhost:3000/api/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            start: "2019-05-01 12:00:00"
          }
        })
      }
    )
    .then(response => response.json())
    .then(console.log)
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
