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
// TODO depth with queue & delete node and right
class BinaryTree {
	constructor(value, {left, right}) {
		this.root = new BinaryNode(value, {left, right})
	}
	add(value) {
		function findPos(node) {
			if (value > node.value) {
				if (node.right === null) {
					const parent = node;
					const newNode = new BinaryNode(value, {parent})
					node.right = newNode;
					return;
				}
				return findPos(node.right)
			} else {
				if (node.left === null) {
					const parent = node;
					const newNode = new BinaryNode(value, {parent})
					node.left = newNode;
					return;
				}
				return findPos(node.left)
			}
		}
		findPos(this.root)
	}
	depth(cb) {
		const visited = new Set();
		function depthRecursion(node) {
			if (!node || visited.has(node)) {
				return;
			}
			visited.add(node);
			cb(node);
			depthRecursion(node.left);
			depthRecursion(node.right);
		}
		depthRecursion(this.root);
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
	delete(val) {
		const nodeToRemove = this.find(val);
		if (nodeToRemove) {
			const { parent, left, right } = nodeToRemove;
			if (!left && !right) {
				if (parent) {
					if (parent.left === nodeToRemove) {
						parent.left = null;
					} else {
						parent.right = null;
					}
				} else {
					this.root = null;
				}
			} else if (left && right) {
				const successor = this.min(nodeToRemove.right);
				nodeToRemove.value = successor.value;
				this.delete(successor.value);
			} else {
				const childNode = left || right;
				if (parent) {
					if (parent.left === nodeToRemove) {
						parent.left = childNode;
					} else {
						parent.right = childNode;
					}
				} else {
					this.root = childNode;
					childNode.parent = null;
				}
			}
		}
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

const tree = new BinaryTree(10, {})

console.log(tree.add(1))
console.log(tree.add(2))
console.log(tree.add(3))
console.log(tree.add(4))
console.log(tree.delete(10))
tree.depth(console.log)
