Number.prototype[Symbol.iterator] = function () {
	let cursor = 0;

	return {
		next: () => {
			const res = {
				value: cursor,
				done: cursor >= this,
			}

			cursor++;
			return res;
		}
	}
}


for (const num of 10) {
	console.log(num)
}
