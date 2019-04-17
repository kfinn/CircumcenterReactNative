import { action, decorate, observable } from 'mobx';
import Event from './Event';

export interface IVenueParams {
  id: string;
  name: string;
  recommendations: number;
  event: Event;
}

export default class Venue {
  public id: string;
  public name: string;
  public recommendations: number;
  public event: Event

  constructor(params: IVenueParams) {
    this.id = params.id;
    this.name = params.name;
    this.recommendations = params.recommendations;
    this.event = params.event;
  }

  public merge(updatedData: IVenueParams) {
    this.name = updatedData.name;
    this.recommendations = updatedData.recommendations;
  }
}

decorate(Venue, {
  merge: action,
  name: observable,
  recommendations: observable,
});
