fetch('/main.js').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
	alert(html);
}).catch(function (err) {
	// There was an error
	alert('Something went wrong.', err);
});
