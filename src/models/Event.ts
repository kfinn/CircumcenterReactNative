import { decorate, observable } from 'mobx';
import moment from 'moment';

export default class Event {
  id: string;
  start: moment.Moment;

  constructor(params: { id: string; start: string }) {
    this.id = params.id;
    this.start = moment(params.start);
  }
};

decorate(Event, {
  id: observable,
  start: observable
});
