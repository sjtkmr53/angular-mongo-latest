var  allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      if (req.method === "OPTIONS") {
        return res.status(200).end();
      }
      next();
    }
    var express = require("express");
    var request = require('request')
    var app = express();
    var redis = require("redis");
    var bodyParser = require('body-parser');
    var cacheManager = require('cache-manager');
    var redisStore = require('cache-manager-redis');
    var cors = require('cors')
    app.use(cors());

    //CORS middleware
    app.use(allowCrossDomain);
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());
    var client = redis.createClient({
        host:'0.0.0', 
        detect_buffers: true
    });
    var userRoutes = require('./routes/userRoutes.js');
    app.use('/createAccount', userRoutes);

    app.listen(2000, function () {
      console.log('Example app listening on port 2000!')
    });
    module.exports = app;