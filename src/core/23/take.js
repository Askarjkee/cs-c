export function take(iterator, limit) {
	let count = 0;
	const iter = iterator[Symbol.asyncIterator]();

	return {
		[Symbol.asyncIterator]() {
			return this;
		},
		next() {
			if (count >= limit) {
				return new Promise((resolve) => resolve({ done: true, value: undefined }))
			}

			count++
			return iter.next();
		}
	}
}
