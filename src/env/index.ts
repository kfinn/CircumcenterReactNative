import { Constants } from 'expo';
import * as PRODUCTION_ENV from './production';
import * as DEVELOPMENT_ENV from './development';

const CURRENT_ENV =
  Constants.manifest.releaseChannel == 'production' ? PRODUCTION_ENV : DEVELOPMENT_ENV;

const {
  CIRCUMCENTER_API_URL,
  CIRCUMCENTER_WEBSOCKET_URL,
  GOOGLE_PLACES_API_KEY
} = CURRENT_ENV;

export {
  CIRCUMCENTER_API_URL,
  CIRCUMCENTER_WEBSOCKET_URL,
  GOOGLE_PLACES_API_KEY
}
