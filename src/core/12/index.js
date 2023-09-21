class Node {
	constructor() {
		this.children = {};
		this.isEnd = false;
	}
}

class Trie {
	constructor() {
		this.root = new Node();
	}

	addWord(word) {
		let current = this.root;
			for (const char of word) {
				if (!current.children[char]) {
					current.children[char] = new Node();
				}
				current = current.children[char];
			}
			current.isEnd = true;
	}

	go(char) {
		const childNode = this.root.children[char];
		return childNode ? new TrieTraversal(childNode) : new TrieTraversal(null);
	}
}

class TrieTraversal {
	constructor(node) {
		this.currentNode = node;
	}

	isWord() {
		const node = this.currentNode;
		return node ? node.isEnd : false;
	}

	go(char) {
		const childNode = this.currentNode.children[char];
		return childNode ? new TrieTraversal(childNode) : new TrieTraversal(null);
	}
}


const trie = new Trie();

trie.addWord('мясо');
trie.addWord('мясорубка');
trie.addWord('мир');

console.log(trie.go('м').go('я').go('с').go('о').isWord()); // true
console.log(trie.go('м').go('и').isWord()); // true
