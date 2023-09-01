function bisecLeft (arr, comparator) {
	let
		left = 0,
		right = arr.length - 1;

	while (left <= right) {
		const
			mid = Math.floor((left + right) / 2),
			res = comparator(arr[mid]);

		if (res === -1) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return left;
}


console.log(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7));


function bisecRight (arr, comparator) {
	let
		left = 0,
		right = arr.length - 1;

	while (left <= right) {
		const
			mid = Math.floor((left + right) / 2),
			res = comparator(arr[mid]);

		if (res === 1) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return right;
}


console.log(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)); // 9


class BinaryNode {

	constructor(value, {parent, left, right}) {
		this.value = value;
		this.parent = parent ?? null;
		this.left = left ?? null;
		this.right = right ?? null;
	}
}

class BinaryTree {
	constructor(value, {left, right}) {
		this.root = new BinaryNode(value, {left, right})
	}
	min() {
		let min = this.root.value;

		function findMin(node) {
			if (node === null) {
				return null;
			}
			if (node.value < min) {
				min = node.value;
			}
			return findMin(node.left)
		}

		findMin(this.root)
		return min;
	}
	max() {
		let max = this.root.value;
		function findMax(node) {
			if (node === null) {
				return null;
			}
			if (node.value > max) {
				max = node.value;
			}
			return findMax(node.right);
		}
		findMax(this.root);
		return max;
	}

	find(value) {
		function findNode(node) {
			if (node === null) return null;

			if (value === node.value) {
				return node;
			}
			if (value < node.value) {
				return findNode(node.left);
			}
			return findNode(node.right);
		}
		return findNode(this.root)
	}
}

const tree = new BinaryTree(10, {
	parent: null,
	left: new BinaryNode(7, {
		parent: null,
		left: new BinaryNode(3, {
			parent: null,
			left: null,
			right: null,
		}),
		right: new BinaryNode(8, {
			parent: null,
			left: null,
			right: null,
		}),
	}),
	right: new BinaryNode(15, {
		parent: null,
		left: new BinaryNode(13, {
			parent: null,
			left: null,
			right: null,
		}),
		right: new BinaryNode(18, {
			parent: null,
			left: null,
			right: null,
		}),
	})
})

console.log(tree.max())
