class Node {
	constructor(val) {
		this.value = val;
		this.next = null;
		this.prev = null;
		this.last = null;
	}
}

export class LinkedList {
	constructor() {
		this.first = null;
		this.last = null;
	}

	add(val) {
		const newNode = new Node(val);
		if (this.first === null) {
			this.first = newNode;
			this.last = newNode;
		} else {
			newNode.prev = this.last;
			this.last.next = newNode;
			this.last = newNode;
		}
	}

	remove(val) {
		let current = this.first;
		while (current !== null) {
			if (current.value === val) {
				if (current.prev !== null) {
					current.prev.next = current.next;
				} else {
					this.first = current.next;
				}

				if (current.next !== null) {
					current.next.prev = current.prev;
				} else {
					this.last = current.prev;
				}

				return true; // Элемент найден и удален
			}
			current = current.next;
		}
		return false; // Элемент не найден
	}

	calcTotal() {
		let iter = this.first;
		let count = 0;
		while (iter !== null) {
			iter = iter.next;
			count++;
		}
		return count;
	}
}


LinkedList.prototype[Symbol.iterator] = function* () {
	let current = this.first;
	while (current) {
		yield current.value;
		current = current.next;
	}
}
