var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../utils/Authenticated')
const {createWorkspaceValidation, validate} = require('../utils/Validator')
const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');
const TaskController =  require('../controllers/TaskController');
const DepartmentController = require('../controllers/DepartmentController')

/* GET home page. */
// render login form
router.get('/', function(req, res){
  res.render('pages/login');
})
// login user
router.post('/login', UserController.login)

router.get('/dashboard', ensureAuthenticated,function(req, res){
  res.render('layout/dashboard');
})
router.get('/create-task', TaskController.createTask);
// admin routes
router.post('/admin/create-user', AdminController.createUser);
router.post('/admin/create-department', createWorkspaceValidation(), validate, DepartmentController.createworkspace)
router.get('/create-task', function(req, res){
  res.render('pages/taskCreation');
})
// admin routes
router.get('/admin', AdminController.index);

// postman testing

module.exports = router;
