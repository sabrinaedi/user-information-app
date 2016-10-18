'use strict'

//Include necessary modules
const express = require('express')
const fs = require('fs')
const app = express()

//adjust settings to view sttic pages in view folder
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

//little test run
app.get('/ping', (req, res) => {
	res.send('Pong')
})

// creates a route to render the index.pug file in the browser
// adds readFile and Parse to go through Json-file
// and render the results on the website via 'res.render'
app.get('/index', (req, res) => {
	console.log('I am running')
	fs.readFile(__dirname + '/users.json', 'utf-8', (err, data) => {
		if (err) throw err
		let parsedData = JSON.parse(data)
		console.log(parsedData)
		res.render('index', {data: parsedData})
	})
})

// app listens to port 8000 for connetions
app.listen(8000, () => {
	console.log('Server is running')
})