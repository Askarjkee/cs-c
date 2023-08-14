function bubbleSort (arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				// swap
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
}

function selectionSort (arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let minIndex = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		if (minIndex !== i) {
			const temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
		}
	}
	return arr;
}


console.log(selectionSort([8,7,6,5,4,3,2,1, 0, -1, -2]))

