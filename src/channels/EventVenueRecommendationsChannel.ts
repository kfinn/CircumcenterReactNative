import camelize from 'camelize';
import Event from '../models/Event';
import ActionCableConsumer from './ActionCableConsumer';

export default (event: Event) => {
  return ActionCableConsumer.subscriptions.create(
    {
      channel: 'EventVenueRecommendationsChannel',
      id: event.id,
    },
    {
      connected: () => undefined,
      disconnected: () => undefined,
      received: () => {
        fetch(`http://localhost:3000/api/events/${event.id}`)
          .then(response => response.json())
          .then(camelize)
          .then((responseJson) => {
            event.merge(responseJson);
          });
      },
    },
  );
};
