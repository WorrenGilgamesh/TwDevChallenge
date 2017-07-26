var express = require('express');
var router = express.Router();
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: "c62bcc65-a25f-4f0b-8a80-c3086b883bd1",
  password: "AQBPSxO4aZCu"
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/analizar', function(req, res, next) {
  tone_analyzer.tone_chat('JSON', function(e,response){
  if(e)
     console.log(e);
  else
    res.send(response);
})
});

module.exports = router;
