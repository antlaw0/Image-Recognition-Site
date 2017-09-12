

const Clarifai = require('clarifai');
const base64Img = require('base64-img');

var fs = require('fs');

const app = new Clarifai.App({
  apiKey : 'c9aad450048c41baaed15f75daee6518'
})


function getImageDescription(filePath, originalName, callback) {


// Need to do this - rename file to have original extension. Concatenate multer's random filename + user's original name
// Does base64Img rely on knowing the original extension to create the base 64 string correctly?
var filename_include_original_name = filePath + originalName;
fs.renameSync(filePath, filename_include_original_name);

    // TODO send image to API.
    // when image fetched, call callback function with data.
    // example data = "cat"
var data = base64Img.base64Sync(filename_include_original_name);   // Example image
// Synchronous function, so no callback. There's an async one if you want to have better manners with your server time.


// TODO Figure out how to modify file for gif, png, other formats.  Not everything is a jpeg.
//data = data.replace('data:image/jpeg;base64,', '');  // Replace prefix generated by base64Sync

firstComma = data.indexOf(',');
data = data.substring(firstComma + 1);   // test this!!


app.models.predict(Clarifai.GENERAL_MODEL, {base64:data}).then(

  function(response) {
  //console.log(JSON.stringify(response));   // TODO something else with the data - like return it via a callback
	//var json_content = JSON.parse(JSON.stringify(response))  // This is redundant :)
	//console.log(json_content.data.name)
  callback(null, response);
	},
  function(err) {
    console.log('ERROR')
    console.error(err);  // TODO something more useful
    callback(err);
  }
);


}


module.exports = getImageDescription
