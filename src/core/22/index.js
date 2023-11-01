const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

sleep(1000).then(() => {
	console.log(`I'am awake!`);
});

function timeout (cb, ms) {
	const timeoutPromise = sleep(ms).then(() => Promise.reject('timeout'));
	return Promise.race([cb, timeoutPromise]);
}

// Через 200 мс Promise будет зареджекчен
timeout(fetch('https://gooogle.kz'), 1)
	.then(console.log)
	.catch(console.error);


function readFile(file, cb) {
	try {
		cb(null, file);
	} catch (error) {
		cb(error);
	}
}

function promisify (originalFn) {
	return function (fileName) {
		return new Promise((resolve, reject) => {
			originalFn(fileName, (error, data) => {
				if (error) {
					reject(error)
				}
				resolve(data);
			})
		})
	}
}

const readFilePromise = promisify(readFile);
readFilePromise('my-file.txt').then(console.log).catch(console.error);

class myPromise {
	constructor(value) {
		if (typeof value === 'function') {
			this.cb = value;
			this.value = null;
			this.state = 'pending';
			this.isCallback = true;
		} else {
			this.cb = null;
			this.value = value;
			this.state = 'pending';
			this.isCallback = false;
		}

		if (this.isCallback) {
			try {
				this.value = this.cb();
				this.state = 'resolved';
			} catch (err) {
				this.state = 'rejected';
				this.value = err;
			}
		}
	}
	resolve(val) {
		this.value = val;
		this.state = 'resolved';
		return this;
	}
	reject(val) {
		this.value = val;
		this.state = 'rejected';
		return this;
	}
	then(cb) {
		if (this.state === 'resolved') {
			try {
				this.value = cb(this.value);
			} catch (err) {
				this.value = err;
				this.state = 'rejected';
			}
		}
		return this;
	}
	catch(cb) {
		if (this.state === 'rejected') {
			this.value = cb(this.value);
		}
		return this;
	}
	all(iterableFns) {
		let
			values = [],
			isError = false;
		for (const fn of iterableFns) {
			try {
				values.push(fn());
			} catch (err) {
				isError = true;
				this.value = err;
				this.state = 'rejected';
				return this;
			}
		}

		if (!isError) {
			this.value = values;
			this.state = 'resolved';
		}

		return this;
	}
}

const SyncPromise = new myPromise(() => {throw '123'});
SyncPromise
	.all([() => {throw 1}, () => 2, () => 3])
	.then(console.log)
	.catch((e) => console.error('err', e))
SyncPromise.resolve(1).then(console.log).catch(console.error); // 1
console.log(2);                           // 2

