import events from 'events';
import { seq } from './seq.js';
import { take } from './take.js';
import { filter } from './filter.js';

const em = new events.EventEmitter();

async function* once(emitter, event) {
	for await (let result of on(emitter, event)) {
		yield result;
		return;
	}
}

function on(emitter, event) {
	const handlers = new Set();
	const queue = [];

	emitter.on(event, (e) => {
		if (!handlers.size) {
			queue.push(e);
		} else {
			handlers.forEach((handler) => {
				handler(e);
			})
			handlers.clear();
		}
	})

	return {
		[Symbol.asyncIterator]() {
			return this;
		},
		next() {
			return new Promise((resolve) => {
				if (queue.length > 0) {
					resolve({done: false, value: queue.shift()})
				} else {
					handlers.add((value) => {
						resolve({done: false, value})
					})
				}
			})
		}
	}
}

(async () => {
	for await (const event of seq(once(em, 'bar'), filter(take(on(em, 'foo'), 10), (value) => value > 200))) {
		console.log(event);
	}
})();

em.emit('foo', 123);
em.emit('foo', 456);
em.emit('foo', 789);
em.emit('foo', 123);
em.emit('foo', 456);
em.emit('foo', 789);
em.emit('bar', 1111);
em.emit('bar', 1111);

