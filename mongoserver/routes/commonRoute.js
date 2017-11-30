var commonControllers = require('../controllers/commonController.js');
var router = express.Router();
router.post('/login', function(req, res){
  commonControllers.common.login(req, res).then(function(response){
  	res.send(response);
  });
});


module.exports = router;