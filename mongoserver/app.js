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




app.post('/createAccount', function (req, res) {
  if(req.body.passcode === 'Navtech'){
    req.body.type = "Admin";
    db.collection('documents').save(req.body,function(error,data){
      if(error){
        res.send({
          status: false,
          messages:" User don't have permission to create Account."
        });
      }else{
        res.send({
          status: true,
          messages:"Account created ."
        });
      }
    });
  }else{
    var data ={
      status:false,
      messages:" User don't have permission to create Account."
    }
    res.send(data);
  }
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})