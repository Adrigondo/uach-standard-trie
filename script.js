// Implementacion de Trie Standard - Lenguaje Javascript
// Martes 10 de octubre de 2023
// 360743 Laura Cecilia Holguín Campos
// 359834 Adrian Alejandro Gonzalez Dominguez
// 358193 Emiliano Rivera Armendariz

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