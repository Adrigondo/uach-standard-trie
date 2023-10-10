// Implementacion de Trie Standard - Lenguaje Javascript
// Martes 10 de octubre de 2023
// 360743 Laura Cecilia Holguín Campos
// 359834 Adrian Alejandro Gonzalez Dominguez
// 358193 Emiliano Rivera Armendariz

class TrieNode {
  constructor(letter) {
    this.letter = letter;
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode(char));
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
    console.log(this.root);
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    console.log(node);
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return true;
  }

  delete(word) {
    const recursiveDelete = (node, word, index) => {
      if (index === word.length) {
        if (node.isEndOfWord) {
          node.isEndOfWord = false;
        }
        return node.children.size === 0;
      }

      const char = word[index];
      if (!node.children.has(char)) return false;

      const shouldDeleteChild = recursiveDelete(node.children.get(char), word, index + 1);
      if (shouldDeleteChild) {
        node.children.delete(char);
        return node.children.size === 0 && !node.isEndOfWord;;
      }

      return false;
    };

    if (!this.search(word)) {
      return false; // Word doesn't exist in the Trie, nothing to delete.
    }

    recursiveDelete(this.root, word, 0);
    return true;
  }

  autocomplete(prefix) {
    const suggestions = [];
    let node = this.root;

    // Traverse the Trie to the node representing the prefix.
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return suggestions; // Prefix doesn't exist in the Trie, return empty array.
      }
      node = node.children.get(char);
    }

    // Use depth-first traversal to find all words with the given prefix.
    function searchChildrenWords(currentNode, currentWord) {
      if (currentNode.isEndOfWord) {
        suggestions.push(prefix + currentWord);
      }

      for (const [char, nextNode] of currentNode.children) {
        searchChildrenWords(nextNode, currentWord + char);
      }
    }

    searchChildrenWords(node, "");

    return suggestions;
  };
}