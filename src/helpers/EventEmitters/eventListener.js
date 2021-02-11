import Emitter from './eventEmitter';
import Notifier from '../notifications/index';

Emitter.on('request created', Notifier.handleCreatedTripRequest);
Emitter.on('request updated', Notifier.handleUpdatedTripRequest);
Emitter.on('comment added', Notifier.handleCommentedOnTripRequest);
