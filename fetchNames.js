const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Change to your URL (Must have Access-Control-Allow-Origin header to allow CORS)
var textFile = "names.txt";

function handleCSVResult(textString) {
  // Get the div element to append the data to
  var dataArea = document.querySelector('#name_list');
  
  // Split data to rows
  var rows = textString.split('\n');
  
  var htmlStr = '';
  var date = "";
  
  // Iterate over each row
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    
    // split row to cells
    var cells = row.split('/');
    
    if (cells.length == 3) {
		date = row;
		htmlStr += '<br>';
	}
	else {
		htmlStr += '<li class="list-group-item"><h5>' + row + '- <i>' + date + '</i>' + '</h5></li>';
	}
	
  }
  
  // Set the string generated from txt as HTML of the dedicated div
  dataArea.innerHTML = htmlStr;
}

// Init Ajax Object
var ajax = new XMLHttpRequest();

// Set a GET request to the URL which points to your txt file
ajax.open('GET', textFile);

// Set the action that will take place once the browser receives your txt
ajax.onreadystatechange = function() {
  if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
    // Request was successful
    var csvData = ajax.responseText;

    // Do something with that data here
    handleCSVResult(csvData);
  }
}

// Send request
ajax.send();

function filterSearch() {
	// Declare variables
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('search-bar');
	filter = input.value.toUpperCase();
	ul = document.getElementById("list-group list-group-flush");
	li = ul.getElementsByTagName('li');
  
	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName("h5")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} 
		else {
			li[i].style.display = "none";
		}
	}
}