var countryList = document.getElementById('json-countrylist');
var inputCountry = document.getElementById('ajax2');

// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);

      // Loop over the JSON array.
      jsonOptions.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item;
        // Add the <option> element to the <datalist>.
        countryList.appendChild(option);
      });

      // Update the placeholder text.
      inputCountry.placeholder = "Search by country";
    } else {
      // An error occured :(
      inputCountry.placeholder = "Couldn't load datalist options :(";
    }
  }
};

// Update the placeholder text.
inputCountry.placeholder = "Loading options...";

// Set up and make the request.
request.open('GET', 'html-countries.json', true);
request.send();