var express = require('express');
var router = express.Router();
var mysqlDB = require('../connection');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res) {
  var loginName = req.body.loginName;
  var password = req.body.password;
  mysqlDB.query("SELECT * FROM users "
    + "JOIN user_departments ON users.department_id = user_departments.department_id "
    + "JOIN user_types ON users.user_type_id = user_types.type_id "
    + "WHERE login_name = '" + loginName + "' AND login_password = '" + password + "' "
    + "LIMIT 1", function (error, rows, fields) {
    if (error || !rows[0]) {
      res.send(false)
    } else {
      res.send(rows[0])
    }
  })
});

router.post('add', function (req, res) {
  // TODO: Add a new employee
});

module.exports = router;
