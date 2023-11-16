function forEach(arr, cb, delay = 10) {
	let time = Date.now();
	let index = 0;

	return new Promise(async (resolve) => {
		const iterate = async () => {
			while (index < arr.length) {
				cb(arr[index]);
				index++;

				if (index % 1000 === 0) {
					await new Promise((r) => setTimeout(r, delay));
				}

				if (Date.now() - time > 200) {
					await new Promise((r) => setTimeout(r, 300));
					time = Date.now();
				}
			}

			resolve();
		};

		await iterate();
	});
}


// setInterval(() => console.log('----'), 100)

async function* iterableForEach(arr) {
	let time = Date.now();
	for (const val of arr) {
		yield val;
		if (Date.now() - time > 100) {
			await new Promise((r) => setTimeout(r, 300));
			time = Date.now();
		}
	}
}


function createsAsyncSemaphore(fn, ...flags) {
	const localFlags = new Set();
	return function (flag) {
		return new Promise((resolve) => {
			if (flags.includes(flag)) {
				localFlags.add(flag);
			}
			if (flags.length === localFlags.size) {
				resolve(fn());
			}
		})
	}
}

class IterSemaphore {
	constructor(limit, tasks) {
		this.limit = limit;
		this.tasks = tasks;
		this.result = [];
		this.pending = [];
	}

	async run() {
		while(this.tasks.length > 0 || this.pending.length > 0) {
			if (this.pending.length < this.limit && this.tasks.length > 0) {
				const task = this.tasks.shift();
				const promise = Promise.resolve(task().then((result) => {
					this.result.push(result);
					this.pending = this.pending.filter((p) => promise !== p);
				}))
				this.pending.push(promise);
			}
			await Promise.race(this.pending);
		}
		return this.result;
	}
}

// Пример использования
const f1 = () => new Promise(resolve => setTimeout(() => resolve('Task 1'), 1000));
const f2 = () => new Promise(resolve => setTimeout(() => resolve('Task 2'), 1000));
const f3 = () => new Promise(resolve => setTimeout(() => resolve('Task 3'), 1000));
const f4 = () => new Promise(resolve => setTimeout(() => resolve('Task 4'), 1000));
const f5 = () => new Promise(resolve => setTimeout(() => resolve('Task 5'), 1000));
const f6 = () => new Promise(resolve => setTimeout(() => resolve('Task 6'), 1000));

const limitedPromises = new IterSemaphore(2, [f1, f2, f3, f4, f5, f6]);
limitedPromises.run().then(console.log).catch(console.error);


const semaphore = createsAsyncSemaphore(() => {
	console.log('Boom!');
	return 121;
}, 'foo', 'bar');

semaphore('foo')
	.then(console.log);

semaphore('bar')
	.then(console.log);


class RWLock {
	constructor(initialValue) {
		this.value = initialValue;
		this.readers = 0;
		this.writers = 0;
	}

	get() {
		if (this.writers > 0) {
			throw new Error('Already locked writers bigger than 0');
		}

		this.readers++;

		const proxy = new Proxy(this, {
			set: function (target, key, value) {
				throw new Error('Cannot modify while reading')
			}
		});
		const free = () => {
			this.readers--;
		}

		return {proxy, free};
	}

	getMut() {
		if (this.readers > 0 || this.writers > 0) {
			throw new Error('Already locked for reading or writing')
		}

		this.writers++;

		const proxy = new Proxy(this, {
			set: function (target, key, value) {
				target[key] = value;
				return true;
			}
		});

		const free = () => {
			this.writers--;
		}

		return {proxy, free};
	}
}

const lock = new RWLock(1);

const { proxy, free } = lock.get();

console.log(proxy.value); // 1
try {
	proxy.value = 2; // Exception
} catch (error) {
	console.error(error.message); // Cannot modify value while reading
}
try {
	lock.getMut(); // Exception - already locked for reading
} catch (error) {
	console.error(error.message); // Already locked for writing
}

free();

const { proxy, free } = lock.getMut();

proxy.value = proxy.value + 2;

console.log(proxy.value); // 3

try {
	lock.get();             // Exception - уже есть пишущий
} catch(e) {
	console.error(e)
}
