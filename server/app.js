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
};
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
// var cors = require('cors');
	config = require('./config'),
  db = config.db,
// app.use(cors());
app.use(allowCrossDomain);
app.use(bodyParser.json());

app.post('/createAccount', function(req, res) {
    var userReqData = req.body;
    db.open(function(err, db) {
    	console.log(err, db);
    db.collection('user').insert(req.body, function(err, res) {
    	if (err) throw err;
    	console.log("1 document inserted");
    	db.close();
  	});
  	});
});



app.listen(3000, function () {
	console.log('Example app listening on port 8080!');
});

