import actioncable from 'actioncable';
import './ActionCableConsumerPatches';
import { CIRCUMCENTER_WEBSOCKET_URL } from '../env';

const ACTION_CABLE_CONSUMER = actioncable.createConsumer(`${CIRCUMCENTER_WEBSOCKET_URL}`);
export default ACTION_CABLE_CONSUMER;
