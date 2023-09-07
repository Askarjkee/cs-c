class OrderedQueue {
	#lastIndex;
	#buffer;
	#comparator;
	constructor(comparator, buffer = []) {
		this.#comparator = comparator;
		this.#buffer = buffer;
		this.#lastIndex = -1;
	}

	get head() {
		return this.#buffer[0] ?? undefined;
	}

	push(value) {
		this.#lastIndex++
		this.#buffer[this.#lastIndex] = value;

		if (this.#lastIndex > 0) {
			this.#fromBottom()
		}
	}

	pop() {
		const { head } = this;

		if (this.#lastIndex >= 0) {
			this.#buffer[0] = this.#buffer[this.#lastIndex];
			this.#buffer[this.#lastIndex] = null;
			this.#lastIndex--;

			if (this.#lastIndex > 0) {
				this.#toBottom();
			}
		}
		return head;
	}

	#getParentIndex(index) {
		return Math.floor((index - 1) / 2)
	}

	#getLeftChildIndex(index) {
		return index * 2 + 1;
	}

	#getRightChildIndex(index) {
		return index * 2 + 2;
	}

	#fromBottom() {
		let cursor = this.#lastIndex;
		const value = this.#buffer[cursor];

		while (cursor > 0) {
			const parentIndex = this.#getParentIndex(cursor),
				parent = this.#buffer[parentIndex];

			if (this.#comparator(value, parent) <= 0) {
				break;
			}

			this.#buffer[cursor] = parent;
			cursor = parentIndex;
		}
		console.log(value, 'value finally')
		this.#buffer[cursor] = value;
	}
 // TODO THIS
	#toBottom() {
		let
			cursor = 0,
			leftChildIndex = this.#getLeftChildIndex(cursor),
			rightChildIndex = this.#getRightChildIndex(cursor);

		const value = this.head;

		while (leftChildIndex <= this.#lastIndex) {
			let
				childIndex;

			if (rightChildIndex > this.#lastIndex) {
				childIndex = leftChildIndex;
			} else {
				childIndex = this.#comparator(this.#buffer[leftChildIndex], this.#buffer[rightChildIndex]) >= 0 ?
					leftChildIndex :
					rightChildIndex
			}

			const
				child = this.#buffer[childIndex];

			if (this.#comparator(value, child) >= 0) {
				break;
			}

			this.#buffer[cursor] = child;

			cursor = childIndex;
			leftChildIndex = this.#getLeftChildIndex(cursor);
			rightChildIndex = this.#getRightChildIndex(cursor);
		}
		this.#buffer[cursor] = value;
	}
}

const queue = new OrderedQueue((a,b) => b - a);

queue.push(1)
queue.push(10)
queue.push(5)
queue.push(16)
console.log(queue.head, 'head')
queue.pop();
