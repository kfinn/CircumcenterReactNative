import { action, decorate, observable } from 'mobx';

export interface IVenueParams {
  id: string;
  name: string;
  recommendations: number;
}

export default class Venue {
  public id: string;
  public name: string;
  public recommendations: number;

  constructor(params: IVenueParams) {
    this.id = params.id;
    this.name = params.name;
    this.recommendations = params.recommendations;
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
