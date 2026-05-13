const fs = require('fs').promises

//Função que retorna uma Promise 
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8')
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

//Uso da Promise 
readFilePromise('users.txt')
    .then(data => {
        console.log('File content:', data)
    })
    .catch(err => {
        console.error('Error reading the file:', err)
    })
    