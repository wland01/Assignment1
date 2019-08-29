var http = require('http'),   /* This creates a module named "http" that uses the http module (http servers). */
    fs = require('fs'),       /* This creates a module named "fs" that uses the fs module (file I/O). */
    url = require('url'),     /* This creates a module named "url" that uses the url module (URL resolution and parsing). */
    port = 8080;              /* The port number that the server will bind to. */

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if (parsedUrl.path == '/listings') {                    //If the url.path is "/listings"
    response.writeHead(200);                              //Success
    response.write(JSON.stringify(listingData, null, 2)); //writes and makes the json text "pretty".
    response.end();
  }
  else {
    response.writeHead(404);                              //404 error
    response.write('Bad gateway error');                  //Message
    response.end();
  }
 
};

fs.readFile('listings.json', 'utf8', function(err, data) {
    //Check for errors
    if (err) throw err;

   //Save the data in the listingData variable already defined
   listingData = JSON.parse(data);  //Parse the text from .json into json object

  //Creates the server
  var server = http.createServer(requestHandler); //Calls request handler.

  //Start the server
  server.listen(port);

});