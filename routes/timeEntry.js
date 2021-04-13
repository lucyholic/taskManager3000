var express = require('express');
var router = express.Router();
var mysqlDB = require('../connection');

router.post('/currentStatus', function (req, res) {
  let userId = req.body.userId
  let yearNumber = req.body.yearNumber
  let weekNumber = req.body.weekNumber
  let dayNumber = req.body.dayNumber

  mysqlDB.query('SELECT type FROM time_logs ' 
  + 'JOIN time_log_types ON time_logs.type_id = time_log_types.type_id ' 
  + 'WHERE user_id = ' + userId + ' '
  + 'AND EXTRACT(YEAR FROM time_stamp) = ' + yearNumber + ' '
  + 'AND EXTRACT(WEEK FROM time_stamp) = ' + weekNumber + ' '
  + 'AND EXTRACT(DAY FROM time_stamp) = ' + dayNumber,
  function(error, rows, fields) {
    if(rows.length > 0)
    {
      res.send({currentStatus: rows[rows.length - 1].type})
    }
    else
    {
      res.send({currentStatus: "Out Shift"})
    }
  })
})

router.post('/retrieveWeekTimeEntries', function (req, res) {
  let userId = req.body.userId
  let weekNumber = req.body.weekNumber
  let startOfWeek = req.body.startOfWeek
  let endOfWeek = req.body.endOfWeek
  let timeEntryRows = []

  mysqlDB.query('SELECT *, EXTRACT(DAY FROM time_stamp) AS time_entry_day FROM time_logs ' 
  + 'JOIN time_log_types ON time_logs.type_id = time_log_types.type_id ' 
  + 'WHERE user_id = ' + userId + ' AND EXTRACT(WEEK FROM time_stamp) = ' + weekNumber + ' '
  + 'ORDER BY time_stamp ASC, type ASC', 
  function (error, rows, fields) {
    timeEntryRows = rows
    let weekTimes = []

    for (let i = startOfWeek; i <= endOfWeek; i++)
    {
      let entriesForToday = timeEntryRows.filter(timeEntry => timeEntry.time_entry_day === i)
      let timeElapsed = 0
      let inShift = {in: false, time: 0}
      let inBreak = {in: false, time: 0}
      let inLunch = {in: false, time: 0}
      
      if(entriesForToday.length == 0)
      {
        weekTimes.push(0)
      }
      else if(entriesForToday[entriesForToday.length - 1].type !== "Out Shift") {
        weekTimes.push(undefined)
      }
      else
      {
        for(let j = 0; j < entriesForToday.length; j++)
        {
          if(entriesForToday[j].type === "In Shift")
          {
            inShift = {in: true, time: entriesForToday[j].time_stamp};
          }
          else if(entriesForToday[j].type === "In Break")
          {
            inBreak = {in: true, time: entriesForToday[j].time_stamp};
          }
          else if(entriesForToday[j].type === "In Lunch")
          {
            inLunch = {in: true, time: entriesForToday[j].time_stamp};
          }
          else if(entriesForToday[j].type === "Out Shift")
          {
            timeElapsed += entriesForToday[j].time_stamp - inShift.time
            inShift = {in: false, time: 0}
          }
          else if(entriesForToday[j].type === "Out Break")
          {
            timeElapsed -= entriesForToday[j].time_stamp - inBreak.time
            inBreak = {in: false, time: 0}
          }
          else if(entriesForToday[j].type === "Out Lunch")
          {
            timeElapsed -= entriesForToday[j].time_stamp - inLunch.time
            inLunch = {in: false, time: 0}
          }
        }
        // milliseconds to hours conversion
        weekTimes.push(timeElapsed / 3600000)
      }
    }
    res.send(weekTimes)
  })
})

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
  var now = new Date()
  now.setHours(now.getHours() - 4)
  var timestamp = "'" + (now.toJSON().substring(0,19).replace('T',' ')) + "'";
  mysqlDB.query('INSERT INTO time_logs (user_id, type_id, time_stamp) VALUES (' + userId + ', ' + typeId + ', ' + timestamp + ')', function (error, result) {
    if (error) {
      res.status(500).send('Error! Try again')
    }

    res.send(result)
  });
});

module.exports = router;
