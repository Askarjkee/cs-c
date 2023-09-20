class TrieNode {
	constructor() {
		this.children = {};
		this.isEnd = false;
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode()
	}

	addWord(word) {
		let node = this.root
		for (const char of word) {
			if (!node.children[char]) {
				node.children[char] = new TrieNode();
			}
			node = node.children[char];
		}
		node.isEnd = true;
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
		return this.currentNode ? this.currentNode.isEnd : false;
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
console.log(trie.go('м').go('я').go('с').go('о').go('р').isWord()); // false
console.log(trie.go('м').go('я').go('с').go('о').go('р').go('у').go('б').go('к').go('а').isWord()); // true
