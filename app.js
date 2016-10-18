'use strict'

//Include necessary modules
const express = require('express')
const fs = require('fs')
const app = express()

//adjust settings to view sttic pages in view folder
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/ping', (req, res) => {
	res.send('Pong')
})

// app listens to port 8000 for connetions
app.listen(8000, () => {
	console.log('Server is running')
})