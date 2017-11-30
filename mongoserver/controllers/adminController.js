function sendEmail(mailOptions, context, template) {
  templates.render('createAccount.html', context, function(err, html,text, subject) {
    mailOptions.html = html;
    transporter.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: html,
      text: context
    });
  });
};

// function sendEmai(mailOptions,context,templates){
//   transporter.sendMail(mailOptions, function(error, response) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Message sent");
//     }
// 	});
// }
function createAccount(req, res, next) {
	var loginInformation = req.body;
	return new Promise(function (resolve, reject) {
	  if(req.body.passcode === 'Navtech'){
	    req.body.type = "Admin";
	    db.collection('user').save(req.body,function(error,data){
	      if(error){
	        reject ({ status: false, messages:" User don't have permission to create Account." });
	      }else{
	        resolve ({ status: true, messages:"Account created ." });
	      }
	    });
	  }else{
	    var data ={ status:false, messages:" User don't have permission to create Account." }
	    resolve (data);
	  }
	})
}

function getAllUserAttendance(req, res, next) {
	return new Promise(function (resolve, reject) {
	   db.collection("userAttendance").find({
    'isLogin':true,
	    }).toArray(function (err,result){
	    if(err){
	      reject ({status:false});
	    }else{
	      resolve ({status:true,data:result});
	    }
	  })
	})
}


function getAllUsers(req, res, next) {
	return new Promise(function (resolve, reject) {
	  db.collection("user").find({
	    'type':'User',
	    'isActive':true
	    }).toArray(function (err,result){
	    if(err){
	      reject ({status:false});
	    }else{
	      resolve({status:true,data:result});
	    }
	  })
	})
}

function getAllLeaveList(req, res, next) {
	return new Promise(function (resolve, reject) {
	  db.collection("leaveList").find({'type':'User'}).toArray(function (err,result){
	    if(err){
	      reject ({status:false});
	    }else{
	      resolve ({status:true,data:result});
	    }
	  })
	})
}


function deleteUser(req, res, next) {
	return new Promise(function (resolve, reject) {
	  db.collection("user").update({
	    'email':req.body.email,
	    'isActive' : true
	    }, {
	        $set: { 'isActive' : false}
	    }, {multi: true },
	    function(err, result) {
	    	if(err){
	    		reject (err) ;
	    	}
	      if(result){
	        resolve ({ status: true});
	      }
	    })
	})
}

function leaveApprove(req, res, next) {
	 var obj = req.body
	return new Promise(function (resolve, reject) {
	  db.collection("leaveList").update({
    '_id': ObjectID(req.body.id)
    }, {
        $set: { 'status' : req.body.value,'disabled':'disabled122'}
    }, {multi: true },
    function(err, result) {
    	if(err){
    		reject({status:false});
    	}
      if(result){
       // sendEmailtoUser(obj)
        resolve ({ status: true});
      }
    })
	})
}





function createUserAccount(req, res, next) {
	req.body.type = "User";
  req.body.isActive = true;
  req.body.password = randomstring.generate(7);
  var email = req.body.email;
  var password = req.body.password;
	return new Promise(function (resolve, reject) {
		db.collection('user').save(req.body,function(error,data){
	    if(error){
	      res.send({ status: false, messages:" User don't have permission to create Account." });
	    }else{
	      res.send({ status: true, messages:"Account created ." });
	      var mailOptions = {
	        from:'sujit.kumar@test.com', 
	        to: email,
	        subject: 'Account Create'
	      };
	      var context = {
	        email:email,
	        password:password
	      }
	      sendEmail(mailOptions,context,'createAccount.html');
	    }
	  });
	})
}



module.exports.admin = {
	createAccount: createAccount,
	getAllUserAttendance: getAllUserAttendance,
	getAllUsers: getAllUsers,
	getAllLeaveList: getAllLeaveList,
	createUserAccount: createUserAccount,
	deleteUser: deleteUser,
	leaveApprove: leaveApprove

};