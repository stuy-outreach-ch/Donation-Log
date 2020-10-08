const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var dates = urlParams.get('dates');

var totalDates = 2;

var textFile = "names.txt";
createRequest();

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");


slider.oninput = function() {
  	output.innerHTML = this.value;
	dates = parseInt(this.value);
	getDates();
  	slider.max = totalDates;

  	createRequest();
}

function handleCSVResult(textString) {
  // Get the div element to append the data to
  var dataArea = document.querySelector('#name_list');
  
  // Split data to rows
  var rows = textString.split('\n');
  
  var htmlStr = '';
  var date = "";
  var numDates = 0;
  // Iterate over each row
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    
    // split row to cells
    var cells = row.split('/');
    
    if (cells.length == 3) {
		if (numDates == dates) break;
		date = row;
		htmlStr += '<br>';
		numDates++;
	}
	else {
		htmlStr += '<li class="list-group-item"><h5>' + '<i>' + date + '</i> - ' + row + '</h5></li>';
	}
	
  }
  
  // Set the string generated from txt as HTML of the dedicated div
  dataArea.innerHTML = htmlStr;
}

function getNumDates(textString) {
	// Get the div element to append the data to
	var dataArea = document.querySelector('#na');
	
	// Split data to rows
	var rows = textString.split('\n');
	
	var htmlStr = '';
	var date = "";
	var numDates = 0;
	// Iterate over each row
	for (var i = 0; i < rows.length; i++) {
	  var row = rows[i];
	  
	  // split row to cells
	  var cells = row.split('/');
	  
	  if (cells.length == 3) {
		  date = row;
		  htmlStr += '<br>';
		  numDates++;
	  }
	  else {
		  htmlStr += '<li class="list-group-item"><h5>' + '<i>' + date + '</i> - ' + row + '</h5></li>';
	  }
	  
	}
	totalDates = numDates;
	// Set the string generated from txt as HTML of the dedicated div
	dataArea.innerHTML = htmlStr;

  }

function createRequest() {
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
}

function getDates() {
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
	    getNumDates(csvData);
	  }
	}

	// Send request
	ajax.send();
}


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

function countDates(file) {
	var rawFile = new XMLHttpRequest();
	var hold = 
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				var hold = allText.split("/");

				return (hold.length - 1) / 2;
				
            }
        }
	}
	alert(rawFile.onreadystatechange)
	return (hold.length - 1) / 2;
    rawFile.send(null);
}