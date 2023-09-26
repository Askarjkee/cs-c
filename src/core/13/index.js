const myRegExp = /^[a-zA-Z0-9_$]+$/;

console.log(myRegExp.test('привет'));

const format = (str, obj) => {
	const regex = /\$\{([a-z]*?)}/g;
	return str.replace(regex, (str, v) => {
		return obj[v]
	})
}
const res = format('Hello, ${user}! Your age is ${age}.', {user: 'Bob', age: 10});
 console.log(res)
