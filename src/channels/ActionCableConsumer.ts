import actioncable from 'actioncable';
import './ActionCableConsumerPatches';

const ACTION_CABLE_CONSUMER = actioncable.createConsumer('ws://localhost:3000/cable');
export default ACTION_CABLE_CONSUMER;
