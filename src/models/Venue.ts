import { decorate, observable, action } from 'mobx';

export interface VenueParams {
  id: string;
  name: string;
  recommendations: number;
}

export default class Venue {
  id: string;
  name: string;
  recommendations: number;

  constructor(params: VenueParams) {
    this.id = params.id
    this.name = params.name
    this.recommendations = params.recommendations
  }

  merge(updatedData: VenueParams) {
    this.name = updatedData.name
    this.recommendations = updatedData.recommendations
  }
}

decorate(Venue, {
  name: observable,
  recommendations: observable,
  merge: action
})
