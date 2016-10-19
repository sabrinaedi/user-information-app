'use strict'

//Include necessary modules
const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')


//adjust settings to view sttic pages in view folder
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// creates a route to render the index.pug file in the browser
// adds readFile and Parse to go through Json-file
// and render the results on the website via 'res.render'
app.get('/index', (req, res) => {
	console.log('index is running')
	fs.readFile(__dirname + '/users.json', 'utf-8', (err, data) => {
		if (err) throw err
		let parsedData = JSON.parse(data)
		res.render('index', {data: parsedData})
	})
})

// route 2 to display the search-page
app.get('/search', (req, res) => {
	console.log('search is running')
	res.render('search')
})

// route 3 to page that portrays the results of comparing the input of the form with the json file
// uses post-request in order to work with the user input
app.post('/matches', function(req, res){ 

	console.log('Matching request will be processed')
	var userReq = req.body.inputUser
	let foundUser = {}

// function that reads and parses the json-file
	fs.readFile(__dirname + '/users.json', 'utf-8', (err, data) => {
		if (err) throw err
			let parsedData = JSON.parse(data)

// callback function that compares the user input with the the parsed json-file
		filterFunction (userReq, parsedData)

		function filterFunction (userReq, parsedData) {
			for (var i=0; i<parsedData.length; i++) {
				if ((parsedData[i].firstName == userReq) || (parsedData[i].lastName == userReq)) {
					foundUser.firstName=parsedData[i].firstName
					foundUser.lastName=parsedData[i].lastName
					res.render('matches', {foundUser})
				}
			}
		}
	})
});


// app listens to port 8000 for connections
app.listen(8000, () => {
	console.log('Server is running')
})