
function userAttendanceLogin(req, res, next) {
	req.body.isLogin = true;
  var attendance = req.body;
	return new Promise(function (resolve, reject) {
	  db.collection('userAttendance').find({
        'email':req.body.email,
        'loginDate' :req.body.loginDate 
    }).toArray(function(err, result) {
      if(err){
        res.send({ status: false });
      }
      if(result){
        db.collection('userAttendance').save(attendance,function(error,data){
          if(error){
            res.send({ status: false});
          }else{
            res.send({ status: true, messages:"login .",btnStatus: "disabled" });
          }
        });

      }else{
        res.send({ status: false});
      }
    })
	})
}


function userAttendanceLogout(req, res, next) {
	return new Promise(function (resolve, reject) {
	  db.collection("userAttendance").update({
    'email':req.body.email,
    'loginDate' :req.body.loginDate,
    'isLogin' : true
    }, {
        $set: {'isLogout': true,'logoutTime':req.body.logoutTime}
    }, {multi: true },
    function(err, result) {
      if (err) reject(err);
      if(result){
        resolve ({ status: true, messages:"logout .",btnStatus: "disabled" });
      }
    })
	})
}

function dailyStatus(req, res, next) {
	return new Promise(function (resolve, reject) {
	  db.collection("userAttendance").update({
	    'email':req.body.email,
	    'loginDate' :req.body.loginDate,
	    'isLogin' : true
	    }, {
	        $set: {'dailyStatus': req.body.status,}
	    }, {multi: true },
	    function(err, result) {
	      if (err) reject(err);
	      if(result){
	        resolve({ status: true, messages:"Status Save" });
	      }
	    })
	})
}


function leaveApply(req, res, next) {
	return new Promise(function (resolve, reject) {
	  db.collection('leaveList').save(req.body,function(error,data){
	    if(error){
	      reject({ status: false });
	    }else{
	      resolve({ status: true, messages:"leave Applied Successfully." });
	    }
	  });
	})
}



module.exports.user = {
	userAttendanceLogin: userAttendanceLogin,
	userAttendanceLogout: userAttendanceLogout,
	dailyStatus: dailyStatus,
	leaveApply: leaveApply
};