var express = require('express');
var router = express.Router();
const request = require('request');
var generatePassword = require('password-generator');

/*
GET users listing.

Fetch record from randomuser API
Save it in our DB
Return the randomuser record + newly generated db ID

*/
router.get('/', function(req, res, next) {
  request('https://randomuser.me/api?nat=us', { json: true }, (err, result, body) => {

    if (err) { return console.log(err); }
    // console.log(result);
    var r = body['results'][0];
    // var password = r['login']['password'];
    var password = generatePassword();
    var dob = r['dob'];
    var first_name = r['name']['first'];
    var last_name = r['name']['last'];

    r['login']['password'] = password;
    r['name']['first'] = first_name.charAt(0).toUpperCase() + first_name.slice(1);
    r['name']['last'] = last_name.charAt(0).toUpperCase() + last_name.slice(1);

    var year = dob.split(" ")[0].split("-")[0];
    var month = dob.split(" ")[0].split("-")[1];
    var date = dob.split(" ")[0].split("-")[2];

    r['dob_year'] = year;
    r['dob_month'] = month;
    r['dob_day'] = date;

    console.log(password);
    console.log(dob);
    console.log(first_name);
    console.log(last_name);

    body['results'][0] = r;

    res.json(body);
  });
  // res.send(body);
});

/*
  capitalization on the names,
  the birthdate in separate day, month, year components
  pw
*/
router.get('/all', function(req, res, next) {

});

router.post('/', function(req, res, next) {
  console.log(req);
  console.log(req.param);
  console.log(req.body);
});

module.exports = router;
