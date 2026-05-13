const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const file = path.join(__dirname,'..', 'users.txt')

function getAllUsers(req, res, next) {
    console.log('Middleware getAllUsers')

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the database file:', err)
            return res.status(500).send('Error reading the database file')
        }      
        const users = data.split('\n')     
        req.users = users
        next()
    })
}

router.get('/getallusers', getAllUsers, (req, res) => {
    res.send('User List:\n' + req.users)
})

router.get('/form', (req, res) => {    
    if (req.query.name && req.query.lname) {        
        const { name, lname } = req.query
        fs.appendFile(file, `${name} ${lname}\n`, (err) => {
            if (err) {
                console.error('Error saving the name to the database file', err)
                return res.status(500).send('Error saving the name to the database file')
            }       
            res.redirect('/')
        })
    } else {        
        res.sendFile(path.join(__dirname, '..', 'public', 'form.html'))
    }
})

module.exports = { router }