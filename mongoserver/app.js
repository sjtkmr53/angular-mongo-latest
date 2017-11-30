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


global.express = require('express')
global.app = express()
global.randomstring = require("randomstring");
// this is use for mongo skin
/*mongo = require('mongoskin'),
config = require('./config'),
db = config.db,
*/
//end
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(allowCrossDomain);

global.MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
// Connection URL using npm mongo n
global.url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
global.db = db;
  // db.close();
});

global.nodemailer = require('nodemailer');
global.transporter = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "nottofunny11@gmail.com",
        pass: "Cricket53@"
    }
});

global.ObjectID = require('mongodb').ObjectID;
global.emailTemplate = require('swig-email-templates');
global.templates = new emailTemplate();
global.path = require("path");
// global.emailTemp = {root: path.join(__dirname, "emailTemplates")
//     }

global.commonRoute = require('./routes/commonRoute.js');
global.adminRoute = require('./routes/adminRoute.js');
global.userRoute = require('./routes/userRoute.js');
app.use('/common', commonRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

function sendEmailtoUser (value){
  db.collection('leaveList').find({
        '_id':ObjectID(value.id)
    }).toArray(function(err, result) {
      if(value.value === "Approve"){
        var mailOptions = {
          from:'sujit.kumar@test.com', 
          to: result[0].userEmail,
          subject: 'Leave Approved',
          text: 'Hi '+result[0].userEmail+ ' your Leave is Approved.'
      };
      }else{
        var mailOptions = {
          from:'sujit.kumar@test.com', 
          to: result[0].userEmail,
          subject: 'Leave disapprove',
          text: 'Hi '+result[0].userEmail+ ' your Leave is disapprove.'
        };
      }
      // sendEmail(mailOptions);
    })
}

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