import { Channel } from 'actioncable';
import { action, decorate, observable } from 'mobx';
import moment from 'moment';
import EventVenueRecommendationsChannel from '../channels/EventVenueRecommendationsChannel';
import VenueSuggestion, { IVenueSuggestionParams } from './VenueSuggestion';

export interface IEventParams {
  id: string;
  start: string;
  venueSuggestions: IVenueSuggestionParams[];
}

export default class Event {
  public id: string;
  public start: moment.Moment;
  public venueSuggestions: VenueSuggestion[];
  public channel?: Channel;

  constructor(params: IEventParams) {
    this.id = params.id;
    this.start = moment(params.start);
    this.venueSuggestions = params.venueSuggestions.map((venueSuggestionParams) => {
      return new VenueSuggestion({ event: this, ...venueSuggestionParams });
    });
  }

  public merge(updatedData: IEventParams) {
    this.start = moment(updatedData.start);

    updatedData.venueSuggestions.forEach((venueSuggestionParams) => {
      const venue = this.venueSuggestions.find(v => v.id === venueSuggestionParams.id);
      if (venue) {
        venue.merge(venueSuggestionParams);
      } else {
        this.venueSuggestions.push(new VenueSuggestion({ event: this, ...venueSuggestionParams }));
      }
    });

    const currentVenueSuggestionIds = updatedData.venueSuggestions.map(v => v.id);
    this.venueSuggestions = this.venueSuggestions.filter(
      v => currentVenueSuggestionIds.some(currentId => v.id === currentId),
    );
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
