var express = require('express');
var router = express.Router();
const request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {

  request('https://randomuser.me/api', { json: true }, (err, result, body) => {

    if (err) { return console.log(err); }
    console.log(result);
    res.json(body);
  });
  // res.send(body);
});



module.exports = router;
