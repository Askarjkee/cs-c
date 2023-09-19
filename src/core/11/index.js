const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'٠',
	'١',
	'٢',
	'٣',
	'٤',
	'٥',
	'٦',
	'٧',
	'٨',
	'٩',
	'Ⅰ',
	'Ⅱ',
	'Ⅲ',
	'Ⅳ',
	'Ⅴ',
	'Ⅵ',
	'Ⅶ',
	'Ⅷ',
	'Ⅸ',
	'Ⅹ',
	'Ⅺ',
	'Ⅻ'
];

function isDigit(str) {
	let charNumbers = [];
	for (let i = 0; i < numbers.length; i++) {
		charNumbers.push(numbers[i].charCodeAt(0))
	}
	for (let i = 0; i < str.length; i++) {
		if (!charNumbers.includes(str[i].charCodeAt(0))) {
			return false;
		}
	}
	return true;
}

console.log(isDigit('123'));  // true
console.log(isDigit('Ⅻ'));   // true
console.log(isDigit('abc'));  // false

function isSurrogatePair(char) {
	const code = char.charCodeAt(0);
	return code >= 0xd800 && code <= 0xdbff;
}

function* iter(string) {
	let index = 0;
	while (index < string.length) {
		const char = string[index];

		if (isSurrogatePair(char)) {
			yield string.slice(index, index + 2);
			index += 2;
		} else {
			yield char;
			index += 1;
		}
	}
}

const unicodeString = '😀';
const unicodeArray = [...iter(unicodeString)];
console.log(unicodeArray); // ['😀']
