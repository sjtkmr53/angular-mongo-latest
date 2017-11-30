var userControllers = require('../controllers/userController.js');
var router = express.Router();
router.post('/userAttendanceLogin', function(req, res){
  userControllers.user.userAttendanceLogin(req, res).then(function(response){
  	res.send(response);
  });
});
router.post('/userAttendanceLogout', function(req, res){
  userControllers.user.userAttendanceLogout(req, res).then(function(response){
  	res.send(response);
  });
});
router.post('/dailyStatus', function(req, res){
  userControllers.user.dailyStatus(req, res).then(function(response){
  	res.send(response);
  });
});

router.post('/leaveApply', function(req, res){
  userControllers.user.leaveApply(req, res).then(function(response){
  	res.send(response);
  });
});


module.exports = router;