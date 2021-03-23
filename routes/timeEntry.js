var express = require('express');
var router = express.Router();
var mysqlDB = require('../connection');

router.get('/:userId', function (req, res) {
  var userId = req.params.userId;
  mysqlDB.query('SELECT * FROM time_logs ' 
    + 'JOIN time_log_types ON time_logs.type_id = time_log_types.type_id ' 
    + 'WHERE user_id = ' + userId, function (error, rows, fields) {
      res.send(rows)
    })
});

router.post('/:userId', function (req, res) {
  var userId = req.params.userId;
  var typeId = req.body.typeId;
  var timestamp = "'" + new Date().toJSON().substring(0,19).replace('T',' ') + "'";
  mysqlDB.query('INSERT INTO time_logs (user_id, type_id, time_stamp) VALUES (' + userId + ', ' + typeId + ', ' + timestamp + ')', function (error, result) {
    if (error) {
      res.status(500).send('Error! Try again')
    }

    res.send(result)
  });
});

module.exports = router;
