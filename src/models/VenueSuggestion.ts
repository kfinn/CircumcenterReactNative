import { action, decorate, observable } from 'mobx';
import Event from './Event';

export interface IVenueSuggestionParams {
  id: string;
  name: string;
  endorsements: number;
  event: Event;
}

export default class VenueSuggestion {
  public id: string;
  public name: string;
  public endorsements: number;
  public event: Event;

  constructor(params: IVenueSuggestionParams) {
    this.id = params.id;
    this.name = params.name;
    this.endorsements = params.endorsements;
    this.event = params.event;
  }

  public merge(updatedData: IVenueSuggestionParams) {
    this.name = updatedData.name;
    this.endorsements = updatedData.endorsements;
  }
}

decorate(VenueSuggestion, {
  endorsements: observable,
  merge: action,
  name: observable,
});
