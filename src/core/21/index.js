function curry(fn) {
	return function curried (...args) {
		const thisArgs = [];
		for (const item of args) {
			if (item) {
				thisArgs.push(item);
			}
		}
		if (thisArgs.length >= fn.length) {
			return fn.apply(this, args.slice(0, fn.length).reverse());
		}
		return function (...args2) {
			return curried.apply(this, thisArgs.concat(args2));
		}
	}
}

const diff = curry((a, b) => a - b);

console.log(diff(curry._, 10)(15)); // 5

function compose(...fns) {
	return function (arg, reversed = true) {
		let result = arg;
		const localFns = reversed ? fns.reverse() : fns;
		for (const fn of localFns) {
			result = fn(result);
		}
		return result;
	}
}

const f = compose(
	(a) => a ** 2,
	(a) => a * 10,
	(a) => Math.sqrt(a) // Первая
);

console.log(f(16)); // 1600

