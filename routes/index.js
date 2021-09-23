var express = require('express');
var router = express.Router();
const {createWorkspaceValidation, validate} = require('../utils/Validator')
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

// user creation
router.get('/create-user', function(req, res) {
  res.render('pages/userCreation');
})

router.get('/dashboard', function(req, res){
  res.render('layout/dashboard');
})
router.get('/create-task', TaskController.createTask);

router.get('/taskCreation' , function(req, res){
  res.render('pages/taskCreation');
})
// admin routes
router.post('/admin/create-user', AdminController.createUser);
router.post('/admin/create-workspace', createWorkspaceValidation(), validate, WorkspaceController.createworkspace)
// postman testing

module.exports = router;
