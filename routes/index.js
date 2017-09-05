var express = require('express');
var router = express.Router();
var clarifai = require('../helpers/image_recog');


/* GET home page. */
router.get('/', function(req, res, next) {

  clarifai(function(data) {
    console.log('This message is in index.js. The data received is ' + data );
  })

  res.render('index', { title: 'Image Recognition' });



});


//handle POST request
router.post('/upload', function(req, res, next){


}); //end of post to Clarifai

module.exports = router;
