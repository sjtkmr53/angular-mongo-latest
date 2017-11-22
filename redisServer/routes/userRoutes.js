var router = express.Router();
var userControllers = require('../controllers/userControllers.js');

router.post('/', function(req, res){
  userControllers.user.create(req, res).then(function(response){
  	res.send(response);
  });
});
module.exports = router;