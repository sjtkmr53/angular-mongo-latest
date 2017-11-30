var adminControllers = require('../controllers/adminController.js');
var router = express.Router();
router.post('/createAccount', function(req, res){
  adminControllers.admin.createAccount(req, res).then(function(response){
  	res.send(response);
  });
});

router.get('/getAllUserAttendance', function(req, res){
  adminControllers.admin.getAllUserAttendance(req, res).then(function(response){
  	res.send(response);
  });
});

router.get('/getAllUsers', function(req, res){
  adminControllers.admin.getAllUsers(req, res).then(function(response){
  	res.send(response);
  });
});

router.get('/getAllLeaveList', function(req, res){
  adminControllers.admin.getAllLeaveList(req, res).then(function(response){
  	res.send(response);
  });
});

router.post('/createUserAccount', function(req, res){
  adminControllers.admin.createUserAccount(req, res).then(function(response){
  	res.send(response);
  });
});
router.post('/deleteUser', function(req, res){
  adminControllers.admin.deleteUser(req, res).then(function(response){
  	res.send(response);
  });
});
router.post('/leaveApprove', function(req, res){
  adminControllers.admin.leaveApprove(req, res).then(function(response){
  	res.send(response);
  });
});



module.exports = router;