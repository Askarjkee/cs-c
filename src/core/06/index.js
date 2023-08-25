import {LinkedList} from "../../lib/LinkedList/index.js";

class Vector {
	constructor(arrayType, options) {
		this.arrayType = arrayType;
		this.capacity = options.capacity;
		this.buffer = new this.arrayType(this.capacity);
		this.length = 0;
	}

	push(...values) {
		for (const value of values) {
			if (this.length >= this.capacity) {
				this.resize()
			}
			this.buffer[this.length] = value;
			this.length++;
		}
		return this.length;
	}

	unshift(...values) {
		const newLength = this.length + values.length;
		if (newLength > this.capacity) {
			this.resize(newLength);
		}
		// смещение на values length
		for (let i = this.length - 1; i >= 0; i--) {
			this.buffer[i + values.length] = this.buffer[i];
		}
		// заполняем
		for (let i = 0; i < values.length; i++) {
			this.buffer[i] = values[i];
		}
		this.length = newLength;
		return this.length;
	}

	shift() {
		if (this.length === 0) {
			return undefined;
		}
		const temp = this.buffer[0];
		const newBuffer = new this.arrayType(this.buffer);
		for (let i = 1; i <= this.length; i++) {
			newBuffer[i - 1] = this.buffer[i];
		}
		this.buffer = newBuffer;
		this.length--;
		return temp;
	}

	pop() {
		if (this.length === 0) {
			return undefined;
		}
		const temp = this.buffer[this.length - 1];
		this.buffer[this.length - 1] = 0;
		this.length--;
		return temp;
	}

	resize(newCapacity = this.capacity * 2) {
		const newBuffer = new this.arrayType(newCapacity);
		for (let i = 0; i < this.length; i++) {
			newBuffer[i] = this.buffer[i];
		}
		this.buffer = newBuffer;
		this.capacity = newCapacity;
	}

	getBuffer() {
		return this.buffer;
	}
}

const uint8Vector = new Vector(Uint8Array, {capacity: 100});

console.log(uint8Vector.push(100));    // 1
console.log(uint8Vector.push(20, 10)); // 3

console.log(uint8Vector.pop());        // 10
console.log(uint8Vector.shift());      // 100

console.log(uint8Vector.unshift(1));          // 2
console.log(uint8Vector.length); // 2
console.log(uint8Vector.getBuffer())

// has get set delete

function getHash(str) {
	let hash = 0;
	if (typeof str !== 'string') {
		str = JSON.stringify(str);
	}
	for (let i = 0; i < str.length; i++) {
		hash += str.charCodeAt(i);
	}
	return hash;
}


class HashMap {
	constructor(capacity) {
		this.buffer = new Array(capacity).fill(undefined);
		this.capacity = capacity;
		this.length = 0;
	}

	#getIndex(str) {
		let index = getHash(str);
		if (index > this.capacity) {
			index = index % this.capacity;
		}
		return index;
	}

	set(key, value) {
		if (this.length * 2 >= this.capacity) {
			this.resize();
		}
		const index = this.#getIndex(key);
		if (this.buffer[index]) {
			this.buffer[index].add({key, value});
		} else {
			const newItem = new LinkedList();
			newItem.add({key, value});
			this.buffer[index] = newItem;
		}
		this.length++;
		return true;
	}

	get(key) {
		const index = this.#getIndex(key);
		if (!this.buffer[index]) {
			return undefined;
		}

		const list = this.buffer[index];
		for (const value of list) {
			if (key === value.key) {
				return value.value;
			}
		}
	}

	has(key) {
		const index = this.#getIndex(key);
		if (!this.buffer[index]) {
			return false;
		}
		const list = this.buffer[index];
		if (list.first === null) {
			return false;
		}
		for (const value of list) {
			if (value.key === key) {
				return true;
			}
		}
		return false;
	}

	delete(key) {
		const index = this.#getIndex(key);
		if (!this.buffer[index]) {
			return false
		} else {
			const list = this.buffer[index];
			let temp;
			for (const value of list) {
				if (value.key === key) {
					temp = value;
					list.remove(value)
				}
			}
			if (list.first === null) {
				this.buffer[index] = undefined;
			}
			return temp.value;
		}
	}

	resize(newCapacity = this.capacity * 2) {
		const newBuffer = new Array(newCapacity).fill(undefined);
		for (let i = 0; i < this.buffer.length; i++) {
			newBuffer[i] = this.buffer[i];
		}
		this.buffer = newBuffer;
		this.capacity = newCapacity;
	}
}

const map = new HashMap(120);
const obj = {a : 1};
map.set('foo', 1);
map.set('ofo', 2);
map.set(42, 10);
map.set(obj, 100);


console.log(map.get(42));          // 10
console.log(map.has(obj));    // true
console.log(map.delete(obj)); // 100
console.log(map.has(obj));    // false

