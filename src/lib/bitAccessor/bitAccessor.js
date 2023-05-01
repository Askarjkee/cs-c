const createBitGetter = (array) => {
	if (array.length === 0) {
		throw new Error('Array is empty')
	}

	const validate = (arrIndex, bitIndex, newBitVal = 0) => {
		if (arrIndex >= array.length || arrIndex < 0) {
			throw new Error('Invalid arr index')
		}
		if (bitIndex < 0) {
			throw new Error('Invalid bit index')
		}
		if (newBitVal > 1) {
			throw new Error('new bit value can be 0 or 1')
		}
	}
	const setBit = (arrayIndex, bitIndex) => {
		array[arrayIndex] = array[arrayIndex] & (1 << bitIndex);
	}

	const resetBit = (arrayIndex, bitIndex) => {
		array[arrayIndex] = arrayIndex[arrayIndex] & ~(1 << bitIndex);
	}

	return {
		get(arrIndex, bitIndex) {
			validate(arrIndex, bitIndex);
			const arrItem = array[arrIndex];
			const bit = arrItem & (1 << bitIndex);
			return bit === 0 ? 0 : 1;
		},
		set(arrIndex, bitIndex, newBitValue) {
			validate(arrIndex, bitIndex, newBitValue);
			if (newBitValue === 0) {
				resetBit(arrIndex, bitIndex)
			} else {
				setBit(arrIndex, bitIndex)
			}
		}
	}
}

export default createBitGetter;


