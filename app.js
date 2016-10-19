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

app.get('/search', (req, res) => {
	console.log('search is running')
	res.render('search')
})


app.post('/matches', function(req, res){ 

  var userReq = req.body.inputUser
  let foundUser = {}

  fs.readFile(__dirname + '/users.json', 'utf-8', (err, data) => {
		if (err) throw err
		let parsedData = JSON.parse(data)
	
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