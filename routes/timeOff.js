var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  
});

router.post('/addTimeOff', function (req, res) {
    
  let startDate = req.body.timeOffStartDate;
  let endDate = req.body.timeOffEndDate;
  let type = req.body.timeOffType;
  let reason = req.body.timeOffReason;
  
  res.json({startDate: startDate, endDate: endDate, type: type, reason: reason})
});

router.put('/', function (req, res) {

});

module.exports = router;
