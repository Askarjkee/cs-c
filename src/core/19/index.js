class Result {
	constructor(callback) {
		this.callback = callback;
		this.state = 'pending';
		this.value = null;
		this.error = null;

		try {
			this.value = this.callback()
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
			callback(this.error)
		}
	}
}

const res1 = new Result(() => 55);

res1.then((data) => {
	console.log(data);
});

const res2 = new Result(() => { throw 'Boom!'; });

res2
	.then((data) => {
	console.log('bla');
	})
	.catch((e) => console.error(e));
