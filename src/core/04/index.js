class Node {
	constructor(data) {
		this.data = data;
		this.prev = null;
		this.next = null;
	}
}

class Dequeue {
	constructor() {
		this.head = null;
		this.last = null;
		this.size = 0;
	}

	// set last
	push(data) {
		const newNode = new Node(data);
		if (!this.head) {
			this.head = newNode;
			this.last = newNode;
		} else {
			newNode.prev = this.last;
			this.last.next = newNode;
			this.last = newNode;
		}
		this.size++;
	}

	// set first
	unshift(data) {
		const newNode = new Node(data);
		if (!this.head) {
			this.head = newNode;
			this.last = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}
		this.size++;
	}

	// get last
	pop() {
		if (!this.last) {
			throw new Error('Dequeue is empty')
		}

		const data = this.last.data;
		if (this.last.prev) {
			this.last = this.last.prev;
			this.last.next = null;
		} else {
			this.head = null;
			this.last = null;
		}
		this.size++;

		return data;
	}

	// get first
	shift() {
		if (!this.head) {
			throw new Error('Dequeue is empty')
		}

		const data = this.head.data;
		if (this.head.next) {
			this.head = this.head.next;
			this.head.prev = null;
		} else {
			this.head = null;
			this.last = null;
		}

		this.size++;
		return data;
	}
}

const dequeue = new Dequeue();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop());   // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop());   // 10
console.log(dequeue.pop());   // Exception

function Stack (arrayType, maxLength) {
	const array = new arrayType(maxLength);
	let size = 0;

	function push(value) {
		if (size < maxLength) {
			array[size++] = value;
		} else {
			throw new Error('Stack is full')
		}
	}

	function pop() {
		if (size > 0) {
			size--;
			const temp = array[size];
			array[size] = 0;
			return temp;
		} else {
			throw new Error('Stack is empty')
		}
	}

	function getAll() {
		return array;
	}
	function head() {
		if (size > 0) {
			return array[size - 1]
		} else {
			throw new Error('Stack is empty')
		}
	}

	return { push, pop, head, getAll };
}

const stack = Stack(Int32Array, 10);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head()); // 12

console.log(stack.pop()); // 12

console.log(stack.head()); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.getAll())



