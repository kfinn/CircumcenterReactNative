import * as React from 'react';
import { View, Text } from 'react-native';
import STYLES from '../Styles';
import { NavigationScreenProps } from 'react-navigation';

const EVENT_SCREEN_ROUTE = 'event';

interface Event { id: string; start: Date }
export interface EventScreenNavigationParams { event: Event }

export default class EventScreen extends React.Component<NavigationScreenProps<EventScreenNavigationParams>, {}> {
  get event() {
    return this.props.navigation.getParam('event')
  }

  public render() {
    return (
      <View style={STYLES.container}>
        <Text>{this.event.id}</Text>
        <Text>{this.event.start}</Text>
      </View>
    );
  }
}

export { EVENT_SCREEN_ROUTE }
