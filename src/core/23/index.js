const events = require('events');
const em = new events.EventEmitter();

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
	for await (const event of on(em, 'foo')) {
		console.log(event);
	}
})();

em.emit('foo', 123);
em.emit('foo', 456);
em.emit('foo', 789);
em.emit('foo', 1111);

