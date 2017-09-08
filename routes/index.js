var express = require('express');
var router = express.Router();
var clarifai = require('../helpers/image_recog');
var tmp = require('tmp');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  clarifai('test file name', function(data) {
    console.log('This message is in index.js. The data received is ' + data );
  })

  res.render('index', { title: 'Image Recognition' });



});


//handle POST request
router.post('/upload', function(req, res, next){

tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
  if (err) throw err;
 
  console.log('File: ', path);
  console.log('Filedescriptor: ', fd);
  
  // If we don't need the file anymore we could manually call the cleanupCallback 
  // But that is not necessary if we didn't pass the keep option because the library 
  // will clean after itself. 
  cleanupCallback();

  getImageDescription(_tempFileCreated)

  });







}); //end of post to Clarifai

module.exports = router;
