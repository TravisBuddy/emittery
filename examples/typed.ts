import Emitter from '../';

type EventType = 'value' | 'end' | 'error';

interface IRecord {
	msg: string;
	data?: any[];
	ts: number;
}

class Logger extends Emitter<EventType> {

	log(msg: string, ...data: any[]) {
		this.emit<IRecord>('value', {msg, data, ts: Date.now()});
		console.log(msg, ...data);
	}
}

const logger = new Logger();

// n.b.: listeners will be called on the next tick.
logger.log('Logging', 'foo');
logger.log('some more', 'bar', 'baz');
logger.log('finally', 'fooz');
logger.emitSerial('end');


// Register our listeners
const off = logger.on<IRecord>('value', rec => console.log(`data: ${rec.data}, ts: ${rec.ts}`));

logger.onAny((name: string, data: any) => console.log('Event %d. Called with %d', name, data));

logger.once('end').then(() => {
	// Unsubscribe methods
	off();               // unsubscribe handler
	logger.off('value'); // unsubscribe method for all listener of the 'value' event.
	logger.offAny();     // unsubscribe method of all `onAny` listener.
	logger.clear();      // unsubscribe all listeners.

	console.log('bye!');
});
