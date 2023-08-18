function collapse(obj, prefix = '') {
	let result = {};

	for (let key in obj) {
		if (typeof obj[key] === 'object') {
			const nested = collapse(obj[key], prefix + key + '.');
			result = { ...result, ...nested };
		} else {
			result[prefix + key] = obj[key];
		}
	}

	return result;
}

function collapseStack(obj) {
	const result = {};
	const stack = [{ obj, prefix: '' }];

	while (stack.length > 0) {
		const { obj, prefix } = stack.pop();

		for (let key in obj) {
			if (typeof obj[key] === 'object') {
				stack.push({ obj: obj[key], prefix: prefix + key + '.' });
			} else {
				result[prefix + key] = obj[key];
			}
		}
	}

	return result;
}

const obj = {
	a: {
		b: [1, 2],
		'': { c: 2 }
	}
};

console.log(collapseStack(obj));

function isValid (str) {
	const arr = str.split('');
	const stack = [];
	const symbolPairs = {
		'(': ')',
		'[': ']',
		'{': '}'
	};

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === '{' || arr[i] === '[' || arr[i] === '(') {
			stack.push(arr[i]);
		}
		if (arr[i] === '}' || arr[i] === ']' || arr[i] === ')') {
			const res = symbolPairs[stack.pop()];
			if (arr[i] !== res) {
				return false;
			}
		}
	}

	return stack.length === 0;
}

console.log(isValid('(hello{world} and [me])'));
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid(')'));                        // false
