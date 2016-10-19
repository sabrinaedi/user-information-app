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


app.post('/matches', function(req, res){ // Specifies which URL to listen for
  // req.body -- contains form data
  console.log(req.body)
  var userReq = req.body.inputUser

  let foundUser = []


  fs.readFile(__dirname + '/users.json', 'utf-8', (err, data) => {
		if (err) throw err
		let parsedData = JSON.parse(data)
		console.log(parsedData)
		filterFunction (userReq, parsedData)


/// write as a callback instead!!
		function filterFunction (userReq, parsedData) {
			for (var i=0; i<parsedData.length; i++) {
			if ((parsedData[i].firstName || parsedData[i].lastName) == userReq) {
				console.log(parsedData[i].firstName + " " + parsedData[i].lastName)
				foundUser.push(parsedData[i].firstName, parsedData[i].lastName)
				console.log(foundUser)
				res.render('matches', {foundUser})
				}
			}
		}
	})
});


// app listens to port 8000 for connetions
app.listen(8000, () => {
	console.log('Server is running')
})