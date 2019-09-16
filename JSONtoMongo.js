'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect('mongodb+srv://wland01:St_Wa7899@cluster0-mppdt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
    //Check for errors
    if (err) throw err;
    var listingData = JSON.parse(data);

    listingData.entries.forEach(function(element) {
      var listing = new Listing({
        code: element.code,
        name: element.name,
        coordinates: element.coordinates,
        address: element.address
      });
      listing.save(function(err) {
        if (err) throw err;
      });

    });

});