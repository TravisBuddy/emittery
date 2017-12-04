import Emitter from '../';

interface Events {
	value: {
		msg: string;
		data?: any[];
		ts: number;
	};

	error: Error;
}

class Logger extends Emitter<Events, {end: true}> {

	log(msg: string, ...data: any[]) {
		this.emit('value', {msg, data, ts: Date.now()});
		console.log(msg, ...data);
	}

	end() {
		this.emit('end');
	}
}

const logger = new Logger();

// n.b.: listeners will be called on the next tick.
logger.log('Logging', 'foo');
logger.log('some more', 'bar', 'baz');
logger.log('finally', 'fooz');
logger.emitSerial('end');


// Register our listeners
const off = logger.on('value', rec => console.log(`data: ${rec.data}, ts: ${rec.ts}`));

logger.onAny((name, data) => console.log('Event %d. Called with %d', name, data));

logger.once('error').then(error => {
	console.error(error.name)
})

logger.once('end').then(dataIsVoid => {
	// Unsubscribe methods
	off();               // unsubscribe handler
	logger.off('value'); // unsubscribe method for all listener of the 'value' event.
	logger.offAny();     // unsubscribe method of all `onAny` listener.
	logger.clear();      // unsubscribe all listeners.

	console.log('bye!');
});
