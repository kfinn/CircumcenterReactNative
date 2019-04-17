import * as React from 'react';
import { View, Text } from 'react-native';
import STYLES from '../Styles';
import { NavigationScreenProps } from 'react-navigation';
import Event from '../models/Event';
import { observer } from 'mobx-react';

const EVENT_SCREEN_ROUTE = 'event';

export interface EventScreenNavigationParams { event: Event }

class EventScreen extends React.Component<NavigationScreenProps<EventScreenNavigationParams>, {}> {
  get event() {
    return this.props.navigation.getParam('event')
  }

  public render() {
    return (
      <View style={STYLES.container}>
        <Text>{this.event.id}</Text>
        <Text>{this.event.start.format()}</Text>
        <Text>{this.event.start.fromNow()}</Text>
      </View>
    );
  }
}

export default observer(EventScreen);

export { EVENT_SCREEN_ROUTE }
