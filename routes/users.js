var express = require('express');
var router = express.Router();
var users = require('../json/users.json')

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res) {
  var loginName = req.body.loginName;
  var password = req.body.password;
  var user = users.find(el => el.login_name === loginName);
  var output = false
  if (user && user.login_password === password) {
    output = user
  }

  res.send(output);
});

router.post('add', function (req, res) {
  // TODO: Add a new employee
});

module.exports = router;
