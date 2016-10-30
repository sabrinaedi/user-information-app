// check if document is loaded and properly connected
var timeSlot = 0

$(document).ready(function(){
	console.log("DOM Ready")
	console.log(timeSlot)
	// create a function using jquery that reacts with every key entered into the form #inputUser
	$('#inputUser').on("keypress", function() {

		console.log('jquery function works')

	// create a variable that takes the input entered into the form as a value 
		var searchUser = {
			name: $('#inputUser').val()
		}

		console.log(searchUser)

	//send a post request only every 300 miliseconds
		console.log(Date.now())
		if ((Date.now() - timeSlot) > 300) {
			postReq()
			timeSlot = Date.now()
			console.log(timeSlot)
		}

		function postReq () {
			
		// post request to pass on the user input to the backend app.js, 
		// use response of the backend function to append matching names to the dropdown of the searchbar
			$.post("/searchBar", searchUser, function (data, stat) {

				$('#users').empty()

				console.log("this is " + data)

				for (var i = 0; i < data.length; i++) {
					$('#users').append("<option>" + data[i] + "</option>")
				}
			})
		}
	})
})








