function iterator(iter) {
	let iterable = iter[Symbol.iterator]();
	const buffer = [];
	let fromBuffer = false;
	return {
		[Symbol.iterator]() {
			return this;
		},
		next: () => {
			const chunk = iterable.next();
			if (chunk.done) {
				iterable = buffer.values();
				fromBuffer = true;
				return chunk;
			} else {
				if (!fromBuffer) {
					buffer.push(chunk.value)
				}
				return chunk;
			}

		}
	}
}


function* random () {
	yield Math.random();
}

const i = random();
console.log(i.next())
console.log(i.next())
console.log(i.next())
console.log(i.next())
console.log(i.next())

