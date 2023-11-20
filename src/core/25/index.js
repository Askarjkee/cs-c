
const result = document.getElementById('result');

if (window.Worker) {
	const myWorker = new Worker('worker.js');

	myWorker.postMessage(1000000);

	myWorker.onmessage = function (e) {
		result.textContent = e.data;
		for (const char of e.data) {
			console.log(char);
		}
		console.log('Message received from worker');
	}
}

