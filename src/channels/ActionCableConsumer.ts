import './ActionCableConsumerPatches';
import ActionCable from 'actioncable';

const ACTION_CABLE_CONSUMER = ActionCable.createConsumer('ws://localhost:3000/cable');
export default ACTION_CABLE_CONSUMER;
