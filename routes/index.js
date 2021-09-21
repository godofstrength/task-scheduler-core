var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');
const TaskController =  require('../controllers/TaskController');
const WorkspaceController = require('../controllers/WorkSpaceController')

/* GET home page. */
// render login form
router.get('/', function(req, res){
  res.render('pages/login');
})
// login user
router.post('/login', UserController.login)

router.get('/dashboard', function(req, res){
  res.render('layout/dashboard');
})
router.get('/create-task', function(req, res){
  res.render('pages/taskCreation');
})
// admin routes
router.get('/admin', AdminController.index);

// postman testing

module.exports = router;
