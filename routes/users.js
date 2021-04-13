var express = require('express');
var router = express.Router();
var mysqlDB = require('../connection');

/* GET users listing. */
router.get('/', function(req, res) {
  mysqlDB.query("SELECT login_name FROM users", function (error, rows, fields) {
    res.send(rows)
  })
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

router.post('/add', function (req, res) {
  var firstName = req.body.user.firstName;
  var lastName = req.body.user.lastName;
  var loginName = req.body.user.loginName;
  var password = req.body.user.password;
  var department = req.body.user.department;
  var type = req.body.user.employeeType;
  var wage = req.body.user.wage;

  var userId = 0;

  var query = "INSERT INTO users (first_name, last_name, login_name, login_password, department_id, user_type_id) VALUES ('" + firstName + "','" + lastName + "','" + loginName  + "','" + password  + "'," + department  + "," + type + ");";

  mysqlDB.query(query, function (error, result) {
    if (error) {
      res.send(error)
    }
    
    userId = result.insertedId
  })

  mysqlDB.query("INSERT INTO user_wage (user_id, wage) VALUES (" + userId  + "," + wage + ")", function (error, result) {
    res.send(result)
  })
})

router.get('/getEmployees', function(req, res) {
  mysqlDB.query("SELECT user_id, first_name, last_name, department, wage"
  + " FROM users"
  + " JOIN user_types"
  + " ON user_type_id = type_id"
  + " JOIN user_departments"
  + " USING (department_id)"
  + " WHERE type_id = 3", 
  function (error, rows, fields) {
    res.send(rows)
  })
});


module.exports = router;
