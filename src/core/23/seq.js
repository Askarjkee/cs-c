export function seq(...iterators) {
	let index = 0;
	let currentIter = iterators[index][Symbol.asyncIterator]();

	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		async next() {
			let current = await currentIter.next();
			if (current.done) {
				if (index === iterators.length - 1) {
					return new Promise((resolve) => resolve({done: true, value: current.value}));
				} else {
					index += 1;
					currentIter = iterators[index][Symbol.asyncIterator]();
					current = await currentIter.next();
					return current;
				}
			} else {
				return current;
			}
		}
	}
}

