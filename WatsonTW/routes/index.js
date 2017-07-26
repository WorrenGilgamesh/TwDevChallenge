var async = require('async');
var json2csv = require('json2csv');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: "c62bcc65-a25f-4f0b-8a80-c3086b883bd1",
  password: "AQBPSxO4aZCu",
  version_date: "2016-05-19"
});

//config.js
/** TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */
var tokens = {
  consumer_key: '9SJoJghNfokEBl4bGrCTuJ5B6',  
  consumer_secret: 'lg0WW0bhnvVPqHw5cAnf9ubVkfNJeyZaw63TAx7DqMbec5TkOa',
  access_token: '803618557-kSsBjbh4VbXiiUpfXzilm5rTaE3Ln4KDjmJCOg0g',  
  access_token_secret: 'pKsO0gYN4asH104GjfIU05yD3htvti9v6NZEWW5QQ5HZ4'
}

var twit = require('twit');
var Twitter = new twit(tokens);

var retweet = function() {
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'    
  }
  
}

var params = {
  // Get the text from the JSON file.
  text:'JSON'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/analizar', function(req, res, next) {
	 var params = {
    q: req.param("nombre"),
    result_type: 'recent',
    lang: 'en'    
  }

  	Twitter.get('search/tweets', params, function(err, data) {
  		console.log(data)
        // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var datosTw = data.statuses.map(function(tweet){
            	return {text:tweet.text}
            })

            async.map(datosTw, watsonUse, function(err, results){
            	res.send(results)
            })
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
          console.log(err);
        }
    });

    function watsonUse(tweetData, cb){
    	tone_analyzer.tone(tweetData, function(error, response) {
  if (error){
  	cb(error)
  }
  else{
  	response.text=tweetData.text;
  	cb(null,response)
  }    
  });
    }
});

router.get('/csv', function(req, res, next) {
	 var params = {
    q: req.param("nombre"),
    result_type: 'recent',
    lang: 'en'    
  }

  	Twitter.get('search/tweets', params, function(err, data) {
  		console.log(data)
        // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var datosTw = data.statuses.map(function(tweet){
            	return {text:tweet.text}
            })

            async.map(datosTw, watsonUse, function(err, results){
            	var csv = json2csv({ data: results });
            	fs.createWriteStream('file.csv', csv).pipe(res.sendFile);
  				
            })
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
          console.log(err);
        }
    });

    function watsonUse(tweetData, cb){
    	tone_analyzer.tone(tweetData, function(error, response) {
  if (error){
  	cb(error)
  }
  else{
  	response.text=tweetData.text;
  	cb(null,response)
  }    
  });
    }
});

module.exports = router;

