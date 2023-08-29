const node1 = {
 	id: ' 1',
	deps: [],
}
const node2 = {
	id: ' 2',
	deps: [node1],
}
const node3 = {
	id: ' 3',
	deps: [node1],
}
const node4 = {
	id: ' 4',
	deps: [node2, node3],
}
const node5 = {
	id: ' 5',
	deps: [node1, node2],
}
const node6 = {
	id: '6',
	deps: [node5, node4],
}
class Graph {
	constructor(node) {
		this.node = node;
	}

	depth(node, cb) {
		const stack = [node];
		const visited = new Set();

		while (stack.length !== 0) {
			const currentNode = stack.pop();
			if (!visited.has(currentNode)) {
				visited.add(currentNode);
				cb(currentNode.id);
			}
			for (const dep of currentNode.deps) {
				stack.push(dep)
			}
		}
	}

	wide(node, cb) {
		const queue = [node];
		const visited = new Set();

		while(queue.length !== 0) {
			const currentNode = queue.shift();
			if (!visited.has(currentNode)) {
				visited.add(currentNode);
				cb(currentNode.id);
			}
			for (const dep of currentNode.deps) {
				queue.push(dep)
			}
		}
	}

	depthRecursion(node,visited = new Set()) {
		if (!visited.has(node)) {
			visited.add(node);
			console.log(node.id);
			for (const dep of node.deps) {
				this.depthRecursion(dep, visited);
			}
		}
	}
}

const graph = new Graph(node6);

// graph.depth(node6, console.log);
graph.depth(node6, console.log);
// graph.depthRecursion(node6);
