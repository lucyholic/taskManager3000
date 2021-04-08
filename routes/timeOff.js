var express = require('express');
var router = express.Router();
var mysqlDB = require('../connection');

router.post('/retrieveTimeOff', function(req, res) {
  let userId = req.body.userId
  
  mysqlDB.query(
    'SELECT tf.*, tft.type'
    + ' FROM time_offs AS tf'
    + ' INNER JOIN time_off_types AS tft' 
    + ' USING (type_id)'
    + ` WHERE user_id = ${userId}`, 
  function (error, rows, fields) {
    if (error) {
      res.json(false)
    }
    else {
      res.json(rows)
    }
  });
});

function typeOfTimeOff(timeOffType) {
  switch(timeOffType) {
    case "vacation":
      return 1;
    case "sickLeave":
      return 2;
    case "personal":
      return 3;
    default:
      return 1;
  }
}

router.post('/addTimeOff', function (req, res) {
  let userId = req.body.userId
  let timeOffType = typeOfTimeOff(req.body.timeOffType)
  let startDate = req.body.timeOffStartDate;
  let endDate = req.body.timeOffEndDate;
  let reason = req.body.timeOffReason;

  mysqlDB.query(`INSERT INTO time_offs VALUES (default, ${userId}, ${timeOffType}, '${startDate}', '${endDate}', default, NULL, NULL, '${reason}');`)

  res.json(true)
});

router.post('/deleteTimeOff', function (req, res) {
  let timeOffId = req.body.timeOffId

  mysqlDB.query('DELETE FROM time_offs WHERE time_off_id = ' + timeOffId + ';' )

  res.json(true)
});

router.get('/manageGetTimeOff', function (req, res) {
  mysqlDB.query(
    'SELECT tf.*, u.first_name, u.last_name, tft.type'
    + ' FROM time_offs AS tf'
    + ' INNER JOIN users AS u' 
    + ' USING (user_id)'
    + ' INNER JOIN time_off_types as tft'
    + ' USING (type_id)', 
  function (error, rows, fields) {
    if (error) {
      res.json(false)
    }
    else {
      res.json(rows)
    }
  })
});

router.post('/modifyApproval', function (req, res) {
  let userId = req.body.userId
  let timeOffId = req.body.timeOffId
  let toApprove = req.body.toApprove

  if(toApprove) {
    mysqlDB.query(
      'UPDATE time_offs'
      + ` SET approved_by = ${userId}, approved_on = CURRENT_TIMESTAMP`
      + ` WHERE time_off_id = ${timeOffId}`
    )
  }
  else {
    mysqlDB.query(
      'UPDATE time_offs'
      + ` SET approved_by = null, approved_on = null`
      + ` WHERE time_off_id = ${timeOffId}`
    )
  }
  res.json(true)
})

module.exports = router;
