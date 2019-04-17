import { Channel } from 'actioncable';
import { action, decorate, observable } from 'mobx';
import moment from 'moment';
import EventVenueRecommendationsChannel from '../channels/EventVenueRecommendationsChannel';
import Venue, { VenueParams } from './Venue';

export interface IEventParams {
  id: string;
  start: string;
  venues: VenueParams[];
}

export default class Event {
  public id: string;
  public start: moment.Moment;
  public venues: Venue[];
  public channel?: Channel;

  constructor(params: IEventParams) {
    this.id = params.id;
    this.start = moment(params.start);
    this.venues = params.venues.map(venueParams => new Venue(venueParams));
  }

  public merge(updatedData: IEventParams) {
    this.start = moment(updatedData.start);

    updatedData.venues.forEach((venueParams) => {
      const venue = this.venues.find(v => v.id === venueParams.id);
      if (venue) {
        venue.merge(venueParams);
      } else {
        this.venues.push(new Venue(venueParams));
      }
    });

    const currentVenueIds = updatedData.venues.map(v => v.id);
    this.venues = this.venues.filter(v => currentVenueIds.some(currentId => v.id === currentId));
  }

  public subscribe() {
    this.channel = EventVenueRecommendationsChannel(this);
  }

  public unsubscribe() {
    if (this.channel) {
      this.channel.unsubscribe();
    }
    this.channel = undefined;
  }
}

decorate(Event, {
  merge: action,
  start: observable,
});
