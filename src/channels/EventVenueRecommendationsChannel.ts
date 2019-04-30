import CircumcenterResponse from '../models/CircumcenterResponse';
import Event from '../models/Event';
import ActionCableConsumer from './ActionCableConsumer';
import { CIRCUMCENTER_API_URL } from '../env';

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
          fetch(`${CIRCUMCENTER_API_URL}/events/${event.id}`),
        );
        event.merge(response);
        return event;
      },
    },
  );
};
