const Department = require('../models/').Department;
const Project = require('../models/').Project;
const Department_User = require('../models/').Department_User


const DepartmentController = {
    //department index page
   async index(req, res){
       const department = await Department.findOne({where: {
           id: req.params.department_id
       }})
       const projects = await Project.findAll({
           where: {
               department_id: req.params.department_id 
           }
        })
     if(projects){
       res.render('layout/pdashboard', {projects: projects, department: department})
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