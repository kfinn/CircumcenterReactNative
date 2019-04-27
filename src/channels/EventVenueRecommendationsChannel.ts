import CircumcenterResponse from '../models/CircumcenterResponse';
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
      received: async () => {
        const response = await CircumcenterResponse(
          fetch(`https://circumcenter.herokuapp.com/api/events/${event.id}`),
        );
        event.merge(response);
        return event;
      },
    },
  );
};
