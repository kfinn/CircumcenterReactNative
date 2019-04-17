import Event from "../models/Event";
import ACTION_CABLE_CONSUMER from "./ActionCableConsumer";

export default function eventVenueRecommendationsChannel(event: Event) {
  return ACTION_CABLE_CONSUMER.subscriptions.create(
    {
      channel: 'EventVenueRecommendationsChannel',
      id: event.id
    },
    {
      connected: () => {},
      disconnected: () => {},
      received: () => {
        fetch(`http://localhost:3000/api/events/${event.id}`)
          .then(response => response.json())
          .then((responseJson) => {
            event.merge(responseJson);
          });
      }
    }
  );
};
