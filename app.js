'use strict'

//Include necessary modules
const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
const stringify = require('json-stringify')


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
app.post('/matches', (req, res) => { 
	console.log('Matching page is running')
	let userReq = req.body.inputUser
	let foundUser = {}

// function that reads and parses the json-file
	fs.readFile(__dirname + '/users.json', 'utf-8', (err, data) => {
		if (err) throw err
		let parsedData = JSON.parse(data)

// for-loop that compares the user input with the the parsed json-file,
// if a match is found, will show uswer, if not, will show error message
		for (let i=0; i<parsedData.length; i++) {
			if ((parsedData[i].firstName == userReq) || (parsedData[i].lastName == userReq)) {
				foundUser.firstName = parsedData[i].firstName
				foundUser.lastName = parsedData[i].lastName
				res.render('matches', {foundUser})
			}
		}
	})
});

// route 4: renders a page with three forms on it, first name, last name and e-mail
app.get('/newuser', (req, res) => {
	console.log('You can add a new user')
	res.render('newuser')
})

// route 5 to add a user and overwrite the json file
app.post('/addUser', (req, res) => {
	console.log('newuser page is running')

	let newUser = {
		firstName : req.body.inputFirstName,
		lastName: req.body.inputLastName,
		email: req.body.inputEmail
	}

	console.log(newUser)

	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err
		let parsedData = JSON.parse(data)
		console.log(parsedData)
		parsedData.push(newUser)
		let updated = JSON.stringify(parsedData)

		fs.writeFile(__dirname + '/users.json', updated)
	})
	res.redirect('index')
})

// app listens to port 8000 for connections
app.listen(8000, () => {
	console.log('Server is running')
})