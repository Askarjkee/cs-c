class Result {
	constructor(callback) {
		this.callback = callback;
		this.state = 'pending';
		this.value = null;
		this.error = null;

		try {
			this.value = this.callback();
			this.state = 'ok';
		} catch (error) {
			this.error = error;
			this.state = 'error';
		}
	}

	then(callback) {
		if (this.state === 'ok') {
			callback(this.value);
		}
		return this;
	}

	catch(callback) {
		if (this.state === 'error') {
			callback(this.error);
		}
	}
}

function exec(generator) {
	const iterator = generator();

	function handleResult (result) {
		if (result instanceof Result) {
			return result;
		} else {
			return new Result(() => result);
		}
	}

	function iterate(iteration) {
		if (iteration.done) {
			return;
		}

		const result = iteration.value;

		if (result instanceof Result) {
			result
				.then(value => iterate(iterator.next(handleResult(value))))
				.catch(error => iterate(iterator.throw(error)))
		} else {
			iterate(iterator.next(handleResult(result)));
		}
	}

	iterate(iterator.next());
}

exec(function* main() {
	const res1 = new Result(() => 55);
	console.log((yield res1).value);
	try {
		const res2 = new Result(() => { throw 'Boomx!'; });
		yield res2; // этот код не будет выполнен из-за выброшенного исключения
	} catch (err) {
		console.error(err);
	}
});
