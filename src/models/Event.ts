import { decorate, observable, action } from 'mobx';
import moment from 'moment';
import Venue, { VenueParams } from './Venue';

export interface EventParams {
  id: string;
  start: string;
  venues: VenueParams[]
}

export default class Event {
  id: string;
  start: moment.Moment;
  venues: Venue[]

  constructor(params: EventParams) {
    this.id = params.id;
    this.start = moment(params.start);
    this.venues = params.venues.map(venueParams => new Venue(venueParams))
  }

  merge(updatedData: EventParams) {
    this.start = moment(updatedData.start);

    updatedData.venues.forEach((venueParams) => {
      let venue = this.venues.find(venue => venue.id == venueParams.id)
      if (venue) {
        venue.merge(venueParams)
      } else {
        this.venues.push(new Venue(venueParams))
      }
    });

    let currentVenueIds = updatedData.venues.map(venue => venue.id);
    this.venues = this.venues.filter(venue => currentVenueIds.some(currentId => venue.id == currentId));
  }
};

decorate(Event, {
  start: observable,
  merge: action
});
