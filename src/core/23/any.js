export function any(...iterators) {
	let isDone = false;

	return {
		[Symbol.asyncIterator]() {
			return this;
		},
		return() {
			isDone = true;

			iterators.forEach((iter) => iter.return(undefined));
			return Promise.resolve({done: true, value: undefined});
		},
		next() {
			return new Promise((resolve) => {
				if (isDone) {
					resolve({done: true, value: undefined});
					return;
				}

				return Promise.any(iterators.map((iter) => iter.next())).then(resolve);
			})
		}
	}
}
