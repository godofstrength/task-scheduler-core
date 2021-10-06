var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../utils/Authenticated')
const {createDepartmentValidation, validate, isAdmin, isSuperAdmin} = require('../utils/Validator')
const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');
const TaskController =  require('../controllers/TaskController');
const DepartmentController = require('../controllers/DepartmentController');
const ProjectController = require('../controllers/ProjectController');


/* GET home page. */
// render login form
router.get('/', function(req, res){
  res.render('pages/login');
})

router.get('/task',function(req, res){
  res.render('layout/taskdashboard');
})
// login user
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)

// reset password
router.get('/reset_password', UserController.reset);

//forget password
router.get('/forget_password', UserController.forget);
// dashboard
router.get('/dashboard', ensureAuthenticated, isAdmin, AdminController.index)

// admin routes
router.post('/admin/create-user', ensureAuthenticated, isSuperAdmin, AdminController.createUser);
router.post('/admin/create-department', ensureAuthenticated ,createDepartmentValidation(), validate, DepartmentController.createDepartment)

// project routes
router.get('/:department_id/projects',ensureAuthenticated, DepartmentController.index)
router.get('/:department_id/create-project', ProjectController.index);
router.post('/:department/createProject', ProjectController.createProject)
// task routes 
router.get('/:project_id/tasks', TaskController.index)
router.get('/:project_id/create-task', TaskController.createTaskPage);
router.post('/:project_id/create-task', TaskController.createTask)


module.exports = router;
