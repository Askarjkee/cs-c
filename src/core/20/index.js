class Result {
	constructor(cb) {
		this.state = 'pending';
		this.value = null;
		this.error = null;
		this.cb = cb;

		try {
			this.value = this.cb();
			this.state = 'ok'
		} catch (error) {
			this.error = error;
			this.state = 'error';
		}
	}

	map(callback) {
		if (this.state === 'ok') {
			try {
				const mappedResult = callback(this.value);
				return new Result(() => mappedResult);
			} catch(err) {
				return Result.Error(err);
			}
		}
	}

	flatMap(callback) {
		if (this.state === 'ok') {
			try {
				const mappedResult = callback(this.value)
				return mappedResult;
			} catch (err) {
				return Result.Error(err)
			}
		}

		return this;
	}

	catch(callback) {
		if (this.state === 'error') {
			try {
				const mappedError = callback(this.error);
				return mappedError;
			} catch(err) {
				return Result.Error(err)
			}
		}

		return this;
	}

	then(callback) {
		return this.map(callback)
	}

	static Error(err) {
		return new Result(() => {throw err});
	}
}

const res = new Result(() => 42);


// монада
console.log([1,2,3,4,5].flatMap(value => [value]));
res
	.flatMap((value) => Result.Error('Boom'))
	.catch(console.error);


// функтор
console.log([1,2,3,4,5].map(val => [val]))
res.map((value) => value * 10).then(console.log);



