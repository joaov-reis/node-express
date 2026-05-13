const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')

const { router } = require('./user/routes')

const port = 3333
const hostname = '127.0.0.1'

app.use(morgan('dev'))

app.use('/user', router)

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'))
})

app.use((err, req, res, next) => {
    console.error('Error in the website:', err)
    res.status(500).send('Internal Server Error')
})

app.use((req, res, next) => {
    res.status(404).send("404 - Not Found. Cannot GET " + req.url)
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})