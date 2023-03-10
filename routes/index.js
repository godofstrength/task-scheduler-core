var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../utils/Authenticated')
const {createDepartmentValidation, validate, isAdmin, isSuperAdmin, isMember} = require('../utils/Validator')
const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');
const TaskController =  require('../controllers/TaskController');
const DepartmentController = require('../controllers/DepartmentController');
const ProjectController = require('../controllers/ProjectController');
const NotificationController = require('../controllers/NotificationController');

// render login form
router.get('/', function(req, res){
  res.render('pages/login');
})

router.get('/task',function(req, res){
  res.render('layout/taskdashboard');
})
// login user
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);


// reset password
router.get('/reset_password', UserController.reset);

//forget password
router.get('/forget_password', UserController.forget);
// dashboard
router.get('/:user_id/profile', ensureAuthenticated, isSuperAdmin, UserController.profile);
router.get('/dashboard', ensureAuthenticated, isAdmin, AdminController.index)

// admin routes
router.post('/admin/create-user', ensureAuthenticated, isSuperAdmin, AdminController.createUser);
router.get('/manage-users', ensureAuthenticated, isSuperAdmin, AdminController.allUsers)
router.post('/:department_id/remove-user', ensureAuthenticated, isMember, AdminController.removeUser);
router.post('/:department_id/manage-users/make_admin', ensureAuthenticated, isMember, AdminController.makeAdmin);
router.post('/:department_id/manage-users/withdraw_admin', ensureAuthenticated, isMember, AdminController.unmakeAdmin);
router.post('/admin/create-department', ensureAuthenticated ,createDepartmentValidation(), validate, DepartmentController.createDepartment)

// department routes
router.get('/:department_id/projects',ensureAuthenticated, isAdmin,DepartmentController.index)
router.post('/:department_id/createProject', ensureAuthenticated, ProjectController.createProject)
router.get('/:department_id/manage-users', ensureAuthenticated, isMember, DepartmentController.manageUsers);
router.post('/profile/add-department', ensureAuthenticated, isSuperAdmin, DepartmentController.addUser)
// task routes 
router.post('/:task_id/start-task', ensureAuthenticated, TaskController.startTask)
router.post('/:task_id/complete-task', ensureAuthenticated, TaskController.completeTask)
router.get('/:project_id/tasks', ensureAuthenticated, TaskController.index)
router.post('/project/create-task', ensureAuthenticated, TaskController.createTask)
router.get('/your-tasks', ensureAuthenticated, TaskController.myTasks);
router.get('/assigned-tasks', ensureAuthenticated, TaskController.assignedTasks);
router.get('/:task_id/feedback', ensureAuthenticated, TaskController.feedback);
router.post('/:task_id/send-feedback', ensureAuthenticated, TaskController.sendFeedBack);
// testing
router.get('/email', function(req,res){
  res.render('emails/newtask.ejs')
})
router.get('/notifications', ensureAuthenticated,NotificationController.loadNotifications);

module.exports = router;