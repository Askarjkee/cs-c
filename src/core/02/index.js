const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const uploadedImage = document.getElementById('uploadedImage');
const transformedImage = document.getElementById('transformedImage');

function uploadImage (fileList) {
	const file = fileList.item(0);
	const url = URL.createObjectURL(file);

	uploadedImage.setAttribute('src', url);
}


function grayscale() {
	assertValidation();

	effectHanlder((array, r, g, b) => {
		const avg = (array[r] + array[g] + array[b]) / 3;

		array[r] = avg; // Red
		array[g] = avg; // Green
		array[b] = avg; // Blue
	});
}

function reset() {
	transformedImage.setAttribute('src', '');
}

function effectHanlder(effectCallback) {
	const imageData = getImageData();
	const data = imageData.data;
	const step = 4;

	for (let i = 0; i < data.length; i += step) {
		effectCallback(data, i, i + 1, i + 2);
	}

	ctx.putImageData(imageData, 0, 0);
	const url = canvas.toDataURL();
	transformedImage.setAttribute('src', url);
}

function getImageData() {
	canvas.width = uploadedImage.width;
	canvas.height = uploadedImage.height;
	ctx.drawImage(uploadedImage, 0, 0);

	return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function assertValidation() {
	if (!uploadedImage.getAttribute('src')) {
		throw new Error('Please upload an image');
	}
}



