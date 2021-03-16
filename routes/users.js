var express = require('express');
var router = express.Router();
var users = require('../json/users.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  var loginName = req.params.loginName;
  var password = req.params.password;
  var user = users.find(el => el.login_name === loginName);
  var login = user.login_password === password;
  var output = login ? user : null;
  res.send(output);
});

router.post('add', function (req, res, next) {

});

module.exports = router;
