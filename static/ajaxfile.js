// check if document is loaded and properly connected
$(document).ready(function(){
	console.log("DOM Ready")
})


// create a function using jquery that reacts with every key entered into the form #inputUser
$('#inputUser').keyup(function() {


	console.log('jquery function works')

// create a variable that takes the input entered into the form as a value 
	var searchUser = {
		name: $('#inputUser').val()
	}

	console.log(searchUser)


setTimeout(postReq(), 300)


function postReq () {

	
// post request to pass on the user input to the backend app.js, 
// use response of the backend function to append matching names to the dropdown of the searchbar
	$.post("/searchBar", searchUser, function (data, stat) {

		var startTime = Date.now()

		$('#users').empty()

		console.log("this is " + data)

		for (var i = 0; i < data.length; i++) {
			$('#users').append("<option>" + data[i] + "</option>")
		}

		timeout()

	if ((Date.now() - startTime) > 300) {
	clearTimeout(postReq)
	postReq()
	}

	})



}
})
