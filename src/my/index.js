function sum (a,b,c,d) {
	return a + b + c + d;
}

function curry (fn) {
	return function curried (...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args.slice(0, fn.length));
		}

		return function (...args2) {
			return curried.apply(this, args.concat(args2))
		}
	}
}

const curried = curry(sum);
console.log(curried(1)(10)(3)(4))
