import actioncable from 'actioncable';
import './ActionCableConsumerPatches';

const ACTION_CABLE_CONSUMER = actioncable.createConsumer('ws://circumcenter.herokuapp.com/cable');
export default ACTION_CABLE_CONSUMER;
