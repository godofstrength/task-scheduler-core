var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../utils/Authenticated')
const {createDepartmentValidation, validate} = require('../utils/Validator')
const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');
const TaskController =  require('../controllers/TaskController');
const DepartmentController = require('../controllers/DepartmentController');
const ProjectController = require('../controllers/ProjectController')


/* GET home page. */
// render login form
router.get('/', function(req, res){
  res.render('pages/login');
})
// login user
router.post('/login', UserController.login)

// user creation
router.get('/create-user',AdminController.userCreation);

// login 
router.get('/user-login',UserController.userLogin)

// reset password
router.get('/reset_password', UserController.reset);

//forget password
router.get('/forget_password', UserController.forget);

router.get('/dashboard', function(req, res){
  res.render('layout/dashboard');
})

// admin routes

router.post('/admin/create-user', AdminController.createUser);
router.post('/admin/create-department',createDepartmentValidation(), validate, DepartmentController.createDepartment)

router.get('/:department_id/create-project', ProjectController.createProject)
// admin routes
router.get('/admin', AdminController.index);
// task routes 
router.get('/:project_id/tasks', TaskController.index)
router.get('/:project_id/create-task', TaskController.createTaskPage);
router.post('/:project_id/create-task', TaskController.createTask)


module.exports = router;
