var express = require('express');
var router = express.Router();
var mysqlDB = require('../connection');

router.get('/', function (req, res) {
  mysqlDB.query('SELECT * FROM user_departments', function (error, rows, fields) {
      res.send(rows)
    })
});

module.exports = router;
