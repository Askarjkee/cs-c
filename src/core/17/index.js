function tag(regExp) {
	return function* (input) {
		const match = input.match(regExp);
		return {type: 'TAG', value: match?.[0]}
	}
}


function take(condition, { min = 1, max = Infinity } = {}) {
	return function* (input) {
		let count = 0;
		let result = '';

		for (const char of input) {
			if (typeof condition === 'function' ? condition(char) : condition.test(char)) {
				if (count < max) {
					count++
					result += char;
				} else {
					break;
				}
			} else {
				continue;
			}
		}

		return {type: 'TAKE', value: result}
	};
}

function seq(...parsers) {
	return function* (input) {
		let index = 0;
		let res = '';

		for (const parser of parsers) {
			const value = parser(input.slice(index)).next().value.value;
			if (value) {
				res += value;
				index += value.length;
			}
		}

		return {type: 'SEQ', value: res};
	}
}

const fnExpr = seq(
	tag(/function /),

	take(/[a-z_$]/i, {max: 1}),
	take(/\w/, {min: 0}),

	tag(/\(\)/),
)('function foo() {}');

console.log(fnExpr.next()); // {done: true, value: {type: 'SEQ', value: 'function foo()'}}

function or(...parsers) {
	return function* (input) {
		for (const parser of parsers) {
			const value = parser(input).next().value.value;
			if (value) {
				return {type: 'OR', value}
			}
		}
	}
}

const boolExpr = or(
	tag(/true/),
	tag(/false/)
)('false');

console.log(boolExpr.next()); // {done: true, value: {type: 'OR', value: 'false'}}

function repeat(iterator, {min = 0, max = Infinity} = {}) {
	return function* (input) {
		let index = 0,
			tries = 0;
		while (tries < max) {
			const value = iterator(input.slice(index)).next().value.value;
			index += value.length;
			tries++;
			if (value) {
				yield { type: 'REPEAT', value };
			} else {
				return { type: 'REPEAT', value: undefined }
			}
		}
	}
}

const takeNumbers = repeat(
	seq(take(/\d/, {max: 3}), tag(/,/)),
	{min: 1}
)('100,200,300,');

console.log(...takeNumbers); // {done: false, value: {type: 'SEQ', value: '100,'}}

