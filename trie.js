//Laura Cecilia Holguín Campos
//360743
//Trie Standard
//JavaScript
//10 de octubre del 2023

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

}

const trie = new Trie();
function insertWord() {
  const word = document.getElementById("inputWord").value;
  manageEmptyInput(word, () => {
    trie.insert(word);
    document.getElementById("output").textContent = `${word} insertado en el Trie.`;
  });
}

function searchWord() {
  const word = document.getElementById("inputWord").value;
  manageEmptyInput(word, () => {
    const found = trie.search(word);

    if (found) {
      document.getElementById("output").textContent = `${word} encontrado en el Trie.`;
    } else {
      document.getElementById("output").textContent = `${word} no encontrado en el Trie.`;
    }
  });
}

function deleteWord() {
  const word = document.getElementById("inputWord").value;
  manageEmptyInput(word, () => {
    const deleted = trie.delete(word);
    if (deleted) {
      document.getElementById("output").textContent = `${word} eliminado del Trie.`;
    } else {
      document.getElementById("output").textContent = `${word} no encontrado en el Trie para eliminar.`;
    }
  });
}

const manageEmptyInput = (word, callback) => {
  if (word) {
    callback();
  } else {
    document.getElementById("output").textContent = `Debe ingresar un valor`;
  }
}