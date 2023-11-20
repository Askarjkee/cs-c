onmessage = function (e) {
	let result = [];
	for (let i = 0; i < e.data; i++) {
		result.push(i);
	}
	console.log('Done', result);
	postMessage(result);
}
