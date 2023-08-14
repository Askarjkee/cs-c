class Node {
	constructor(val) {
		this.value = val;
		this.next = null;
		this.last = null;
	}
}

class LinkedList {
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

const list = new LinkedList();

list.add(1);
list.add(2);
list.add(3);


console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1

console.log(list.first.next)
console.log(list.calcTotal()) // 3

for (const value of list) {
	console.log(value);
}

