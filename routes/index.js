var express = require('express');
var router = express.Router();
var clarifai = require('../helpers/image_recog');
var tmp = require('tmp');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});   //Create this uploads directory in the root directory of your project

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


router.get('/test_file_upload', function(req, res, next){
  res.render('image_upload');
});


router.post('/upload_image', upload.single('user_image'), function(req, res, next){
  // save image, do image recognition stuff

  console.log('file' + req.file.filename); // req.file is the 'user_image' file
  // Note you need to name the file upload input in the HTML 'user_image'


  clarifai('./uploads/' + req.file.filename, req.file.originalname, function(err, data) {
    if (err) {
      console.log('Error from Clarifai ' + err);
      return next(err); //for development, send to to the 500 error handler
    }
    else {
      console.log('This message is in index.js. The data received is ' + data );
      //return res.send(JSON.stringify(data));   // replace with something more user-friendly
	  return res.send(JSON.stringify(data.outputs.data.concepts.name));   // replace with something more user-friendly
    
    }
  });

});


module.exports = router;
