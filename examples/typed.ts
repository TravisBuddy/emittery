/// <reference types="node" />

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
logger.emit('end');

// Register our listeners
logger.on<IRecord>('value', rec => console.log(`data: ${rec.data}, ts: ${rec.ts}`));
logger.once('end').then(() => console.log('bye!'));
