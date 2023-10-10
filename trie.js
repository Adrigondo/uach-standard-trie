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

const trie = new Trie();
function insertWord() {
  const word = document.getElementById("inputWord").value;
  manageEmptyInput(word, () => {
    trie.insert(word);
    document.getElementById("output").innerHTML = `Se añadió al Trie la palabra <i>${word}</i>.`;
  });
}

function searchWord() {
  const word = document.getElementById("inputWord").value;
  manageEmptyInput(word, () => {
    const found = trie.search(word);

    if (found) {
      document.getElementById("output").innerHTML = `Se encontró la palabra <i>${word}</i> en el Trie.`;
    } else {
      document.getElementById("output").innerHTML = `No se encontró la palabra <i>${word}</i> en el Trie.`;
    }
  });
}

function deleteWord() {
  const word = document.getElementById("inputWord").value;
  manageEmptyInput(word, () => {
    const deleted = trie.delete(word);
    if (deleted) {
      document.getElementById("output").innerHTML = `Se eliminó del Trie la palabra <i>${word}</i>.`;
    } else {
      document.getElementById("output").innerHTML = `No se encontró la palabra <i>${word}</i> en el Trie, por lo que no se puede eliminar`;
    }
  });
}

function autocompleteWord() {
  const prefix = document.getElementById("inputWord").value;

  const autocompleteResult = trie.autocomplete(prefix);

  if (autocompleteResult.length === 0) {
    document.getElementById("output").textContent = "Sin sugerencias del autocompletado.";
  } else {
    const suggestions = "Sugerencias del autocompletado: <i>" + autocompleteResult.join("</i>, <i>") + "</i>.";
    document.getElementById("output").innerHTML = suggestions;
  }
}

function loadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      addWordsFromFile(fileContent);
    };

    reader.readAsText(file);
  } else {

    document.getElementById("output").textContent = `Para agregar las palabras del archivo al Trie, debe subir un archivo primero.`;
  }

  // Clear the file input to allow selecting the same file again
  fileInput.value = "";
}

function addWordsFromFile(fileContent) {
  const words = fileContent.split(/\r?\n/); // Split words by line breaks

  for (const word of words) {
    if (word.trim() !== "") { // Skip empty lines
      trie.insert(word.trim()); // Insert each word into the Trie
    }
  }

  document.getElementById("output").textContent = `Se agregaron las palabras del archivo al Trie.`;
}

const manageEmptyInput = (word, callback) => {
  if (word) {
    callback();
  } else {
    document.getElementById("output").textContent = `Debe ingresar una palabra.`;
  }
}