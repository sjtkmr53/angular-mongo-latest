var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With', 'Content-Type', 'Authorization');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}


const express = require('express')
const app = express()
const randomstring = require("randomstring");
// this is use for mongo skin
/*mongo = require('mongoskin'),
config = require('./config'),
db = config.db,
*/
//end
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(allowCrossDomain);

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL using npm mongo n
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
global.db = db;
  // db.close();
});

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "nottofunny11@gmail.com",
        pass: "Cricket53@"
    }
});

function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions, function(error, response) {
      if (error) {
          console.log(error);
      } else {
          console.log("Message sent");
      }
  });
};

app.post('/createAccount', function (req, res) {
  if(req.body.passcode === 'Navtech'){
    req.body.type = "Admin";
    db.collection('user').save(req.body,function(error,data){
      if(error){
        res.send({ status: false, messages:" User don't have permission to create Account." });
      }else{
        res.send({ status: true, messages:"Account created ." });
      }
    });
  }else{
    var data ={ status:false, messages:" User don't have permission to create Account." }
    res.send(data);
  }
})

app.post('/login', function (req, res) {
  var loginInformation = req.body;
  db.collection('user').find({
        'email':loginInformation.email
    }).toArray(function(err, result) {
    if(err){
      res.send({ status: false, messages:"invalid Username" });
    }else{
      if(result.length>0){
        if(result[0].password === loginInformation.password){
          if(result[0].type === "Admin"){
            res.send({ status: true, type: 'Admin', email:result[0].email });
          }else{
            res.send({ status: true, type: 'User', email:result[0].email });
          }
        }else{
          res.send({ status: false, messages: 'Invalid Username or Password' });
        }
      }else{
        res.send({ status: false, messages: 'Invalid Username or Password' });
      }
      
    }
  });
  
})

app.post('/createUserAccount', function (req, res) {
  req.body.type = "User";
  req.body.password = randomstring.generate(7);
  var email = req.body.email;
  var password = req.body.password;
  db.collection('user').save(req.body,function(error,data){
    if(error){
      res.send({ status: false, messages:" User don't have permission to create Account." });
    }else{
      res.send({ status: true, messages:"Account created ." });
      var mailOptions = {
        from:'sujit.kumar@test.com', 
        to: email,
        subject: 'Account Create',
        text: 'Hi '+email+ ' your password  is '+password
    };
      sendEmail(mailOptions);
    }
  });
})

app.post('/userAttendance/login',function(req,res){
  req.body.isLogin = true;
  var attendance = req.body;
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

app.post('/userAttendance/logout',function(req,res){
  db.collection("userAttendance").update({
    'email':req.body.email,
    'loginDate' :req.body.loginDate,
    'isLogin' : true
    }, {
        $set: {'islogout': true,'logoutTime':req.body.logoutTime}
    }, {multi: true },
    function(err, result) {
      if (err) throw err;
      if(result){
        res.send({ status: true, messages:"logout .",btnStatus: "disabled" });
      }
    })
})

app.post('/userAttendance/dailyStatus',function(req,res){
  db.collection("userAttendance").update({
    'email':req.body.email,
    'loginDate' :req.body.loginDate,
    'isLogin' : true
    }, {
        $set: {'dailyStatus': req.body.status,}
    }, {multi: true },
    function(err, result) {
      if (err) throw err;
      if(result){
        res.send({ status: true, messages:"Status Save" });
      }
    })
})

app.post('/getUserInformation',function(req,res){
  db.collection("userAttendance").find({
    'email':req.body.email,
    }).toArray(function (err,result){
    if(err){
      res.send({status:false});
    }else{
      res.send({status:true,data:result});
    }
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})