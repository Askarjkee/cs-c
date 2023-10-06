function random(min,max) {
	return {
		[Symbol.iterator]() {
			return this;
		},

		next: () => {
			return {
				value: Math.floor(Math.random() * (max - min + 1)) + min,
				done: false
			};
		}
	}
}

function take(iter, limit) {
	let count = 0;
	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
			count++;
			const obj = iter[Symbol.iterator]().next();
			if (obj && count <= limit) {
				return obj;
			}
			return {
				value: undefined,
				done: true,
			}
		}
	}
}

function filter(iter, predicate) {
	const iterable = iter[Symbol.iterator]();
	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
			let chunk = iterable.next();

			while (true) {
				if (predicate(chunk.value) || chunk.done) {
					return chunk;
				}
				chunk = iterable.next()
			}
		}
	}
}

function enumerate (iter) {
	let iterCount = 0;

	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
			const obj = iter[Symbol.iterator]().next();
			let temp;
			if (obj && !obj.done) {
				temp = {
					value: [iterCount, obj.value],
					done: false
				}
			} else {
				temp = {
					value: undefined,
					done: true
				}
			}

			iterCount++
			return temp;
		}
	}
}

class Range {
	constructor(from, to) {
		this.from = typeof from === 'string' ?  from.charCodeAt(0) : from;
		this.to = typeof to === 'string' ?  to.charCodeAt(0) : to;
		this.isCharCode = typeof from === 'string' && typeof to === 'string';
		this.isReversed = false;
	}

	reverse() {
		this.isReversed = !this.isReversed;
		const temp = this.from;
		this.from = this.to;
		this.to = temp;
		return this[Symbol.iterator]();
	}

	[Symbol.iterator]() {
		return {
			[Symbol.iterator]() {
				return this;
			},

			next: () => {
				let temp;
				if (!this.isReversed && (this.from <= this.to)) {
					temp = {
						value: this.isCharCode ? String.fromCharCode(this.from) : this.from,
						done: false,
					}
				} else if (this.isReversed && (this.from >= this.to)) {
					temp = {
						value: this.isCharCode ? String.fromCharCode(this.from) : this.from,
						done: false,
					}
				} else {
					temp = {
						value: undefined,
						done: true,
					}
				}
				!this.isReversed ? this.from += 1 : this.from -= 1;
				return temp;
			}
		}
	}
}

function seq (...args) {
	let cursor = 0;
	const buffer = [];
	for (const items of args) {
		for (const item of items) {
			buffer.push(item);
		}
	}

	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
				const temp = {
					value: buffer[cursor],
					done: cursor >= buffer.length
				}
				cursor++;
				return temp;
		}
	}
}

function zip(...iterables) {
	const iters = iterables.map((iter) => iter[Symbol.iterator]());

	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
			const nextValues = iters.map((iter) => iter.next());
			return {
				value: nextValues.map(({value}) => value),
				done: nextValues.every(({done}) => done),
			}
		}
	}
}

function mapSeq(iterable, iterableCb) {
	const iter = iterable[Symbol.iterator]();
	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
			let result = iter.next();
			for (const cb of iterableCb) {
				result.value = cb(result.value)
			}
			return result;
		}
	}
}

const randomInt = random(0, 100);
console.log([...take(filter(randomInt, (el) => el > 30), 15)], 'hey');
console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]


