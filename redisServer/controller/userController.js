var redis = require("redis");
var client = redis.createClient({
  host:'0.0.0.', 
  detect_buffers: true
});
function create(req,res,next){
	var sessionId = req.body.sessionId;
  client.get(sessionId,function(err,result){
    if(err){
      throw err;
    }else{
      if(result){
        console.log('user already exists')
      }else{
        client.set(sessionId,JSON.stringify(req.body),function(error,data){
          if(error){
            throw error;
          }else{
            res.send({status:true, messages:"record created"});
          }
        });  
      }
    }
  })
}

module.exports.user = {create: create};