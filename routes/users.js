var express = require('express');
var router = express.Router();
var mysqlDB = require('../connection');

/* GET users listing. */
router.get('/', function(req, res) {
  mysqlDB.query("SELECT * FROM users "
    + "JOIN user_departments ON users.department_id = user_departments.department_id "
    + "JOIN user_types ON users.user_type_id = user_types.type_id;", function (error, rows, fields) {
      if (error) {
        res.send(error)
      }
      
      res.send(rows)
  })
});

router.get('/:userId', function (req, res) {
  var userId = req.params.userId;
  mysqlDB.query("SELECT * FROM users "
    + "JOIN user_departments ON users.department_id = user_departments.department_id "
    + "JOIN user_types ON users.user_type_id = user_types.type_id "
    + "WHERE users.user_id = " + userId, function (error, rows, fields) {
      if (error) {
        res.send(error)
      }
      
      res.send(rows)
    })
})

router.post('/login', function (req, res) {
  var loginName = req.body.loginName;
  var password = req.body.password;
  mysqlDB.query("SELECT *, user_types.type AS user_type, user_types.type_id AS user_type_id, " 
    + "time_log_types.type AS time_log_type, time_log_types.type_id AS time_log_type_id, time_logs.time_log_id FROM users "
    + "JOIN user_departments ON users.department_id = user_departments.department_id "
    + "JOIN user_types ON users.user_type_id = user_types.type_id "
    + "LEFT JOIN time_logs ON users.user_id = time_logs.user_id "
    + "LEFT JOIN time_log_types ON time_logs.type_id = time_log_types.type_id "
    + "WHERE login_name = '" + loginName + "' AND login_password = '" + password + "' "
    + "ORDER BY time_logs.time_log_id DESC "
    + "LIMIT 1", function (error, rows, fields) {
    if (error || !rows[0]) {
      res.send(false)
    } else {
      res.send(rows[0])
    }
  })
});

router.post('/add', function (req, res) {
  var firstName = req.body.user.first_name;
  var lastName = req.body.user.last_name;
  var loginName = req.body.user.login_name;
  var password = req.body.user.login_password;
  var department = req.body.user.department_id;
  var type = req.body.user.type_id;
  var wage = req.body.user.wage;

  var query = "INSERT INTO users (first_name, last_name, login_name, login_password, department_id, user_type_id, wage) " 
    + "VALUES ('" + firstName + "','" + lastName + "','" + loginName  + "','" + password  + "'," + department  + "," + type + ", " + wage + ");";

  mysqlDB.query(query, function (error, result) {
    if (error) {
      res.send(error)
    }
    
    res.send(result)
  })
})

router.put('/:userId', function(req, res) {
  var userId = req.params.userId;
  var firstName = req.body.user.first_name;
  var lastName = req.body.user.last_name;
  var loginName = req.body.user.login_name;
  var password = req.body.user.login_password;
  var department = req.body.user.department_id;
  var type = req.body.user.type_id;
  var wage = req.body.user.wage;

  var query = "UPDATE users SET first_name = '" + firstName + "', last_name = '" + lastName + "', login_name = '" + loginName + "', "
    + "login_password = '" + password + "', department_id = " + department + ", user_type_id = " + type + ", wage = " + wage
    + " WHERE user_id = " + userId + ";";

  mysqlDB.query(query, function (error, result) {
    if (error) {
      res.send(error)
    }
    
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

router.get('/test', function (req, res) {
  res.send('Test Users');
})

module.exports = router;
