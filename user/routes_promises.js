const express = require('express')
const router = express.Router()
const fs = require('fs').promises
const path = require('path')

const file = path.join(__dirname, '..', 'users.txt')

function readFilePromise() {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8')
            .then(data => {
                const users = data.split('\n')
                resolve(users)
            })
            .catch(err => {
                console.error('Error reading the database file:', err)
                reject(err)
            })
    })
}

function appendFilePromise(name, lname) {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, `${name} ${lname}\n`)
            .then(() => {
                resolve()
            })
            .catch(err => {
                console.error('Error saving the name to the database file', err)
                reject(err)
            })
    })
}

router.get('/getallusers', async (req, res) => {
    try {
        const users = await readFilePromise()
        res.send('User List:\n' + users.join('\n'))
    } catch (err) {
        res.status(500).send('Error reading the database file')
    }
})

router.get('/form', (req, res) => {
    if (req.query.name && req.query.lname) {
        const { name, lname } = req.query
        appendFilePromise(name, lname)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.status(500).send('Error saving the name to the database file')
            })
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'form.html'))
    }
})

module.exports = { router }