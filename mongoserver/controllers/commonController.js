
function login(req, res, next) {
	var loginInformation = req.body;
	return new Promise(function (resolve, reject) {
	  db.collection('user').find({
	        'email':loginInformation.email
	    }).toArray(function(err, result) {
	    if(err){
	      reject ({ status: false, messages:"invalid Username" });
	    }else{
	      if(result.length>0){
	        if(result[0].password === loginInformation.password){
	          if(result[0].type === "Admin"){
	            resolve({ status: true, type: 'Admin', email:result[0].email });
	          }else{
	            resolve({ status: true, type: 'User', email:result[0].email });
	          }
	        }else{
	          resolve({ status: false, messages: 'Invalid Username or Password' });
	        }
	      }else{
	        resolve({ status: false, messages: 'Invalid Username or Password' });
	      }
	      
	    }
	  });
	})
}




module.exports.common = {
	login: login
};