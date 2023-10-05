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
	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
			const obj = iter[Symbol.iterator]().next();
			if (predicate(obj.value)) {
				return obj;
			}
			return {
				value: undefined,
				done: true
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
	const iterators = [];
	const result = [];
	let cursor = 0;
	for (let i = 0; i < iterables.length; i++) {
		iterators.push(iterables[i][Symbol.iterator]())
	}
	while (true) {
		const nextValues = iterators.map(iterator => iterator.next());
		if (nextValues.some(({ done }) => done)) {
			break;
		}
		const tuple = nextValues.map(({ value }) => value);
		result.push(tuple);
	}

	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
			const temp = {
				value: result[cursor],
				done: cursor >= result.length
			}
			cursor++;
			return temp;
		}
	}
}



const bla = zip([1, 2], new Set([3, 4]), 'bl');
console.log([...zip([1, 2], new Set([3, 4]), 'bl')]); // [[1, 3, b], [2, 4, 'l']]

const randomInt = random(1, 100);

const symbolRange = new Range('a', 'f');
const numberRange = new Range(-5, 1);

// console.log(Array.from(numberRange.reverse()));
// console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']
console.log(...seq([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'

// console.log([...take(enumerate(randomInt), 3)]); // [[0, ...], [1, ...], [2, ...]]



