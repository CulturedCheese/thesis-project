var countryInput = document.getElementById('ajax2');
var countryList = document.getElementById('json-countrylist');
var languageInput = document.getElementById('ajax');
var languageList = document.getElementById('json-languagelist');
// Create a new XMLHttpRequest.

var autocomplete = function(list, input, source) {
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
          list.appendChild(option);
        });
      } else {
        // An error occured :(
        input.placeholder = "Couldn't load datalist options :(";
      }
    }
    // Update the placeholder text.
    input.placeholder = "Loading options...";
  };


  // Set up and make the request.
  // request.open('GET', 'html-elements.json', true);
  request.open('GET', source , true);
  request.send();
};

autocomplete(languageList, languageInput, 'html-languages.json');
autocomplete(countryList, countryInput, 'html-countries.json');


