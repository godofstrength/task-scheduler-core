const Department = require('../models/').Department;
const Project = require('../models/').Project;
const Department_User = require('../models/').Department_User;
const Task = require('../models/').Task;
const User = require('../models/').User


const DepartmentController = {
    //department index page
   async index(req, res){
      // find the department 
      const department = await Department.findOne({
        where: { id: req.params.department_id },
        include: [{
            model: User
        }]
    });
// remove the first user|| Superadmin from list
    department.Users.shift()
        // if we have a department find the projects 
     if(department){
        const projects = await Project.findAll(
            {where: {department_id: department.id }},
             {include: [Task]})
       res.render('layout/pdashboard', {projects: projects, department: department, users: department.Users})
     }else{
        res.redirect('/dashboard')
     }
       
    },

    createDepartment(req, res){
        // create Department
    const {title, description, code} = req.body;
    Department.create({
        title: title,
        description: description,
        code: code.toUpperCase(),
    })
    .then(result => {
        //add user that creates the department as admin
        Department_User.create({
            user_id: req.user.id,
            department_id: result.id,
            role: 1
        })
        .then(result => {
        req.flash({success_msg: 'department created successfully'})
        res.redirect('/dashboard');
        })
        .catch(err => {
            console.log(err.msg)
        })
        
    })
    .catch(err => {
        req.flash({error_msg: err.msg})
        res.redirect('/dashboard')
    })

    }
}
module.exports = DepartmentController;