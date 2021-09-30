const Department = require('../models/Department');
const Project = require('../models/Project');

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
       res.render('pages/projectList', {projects: projects, department: department})
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
        req.flash({success_msg: 'department created successfully'})
        res.redirect('/dashboard');
    })
    .catch(err => {
        req.flash({error_msg: err.msg})
        res.redirect('/dashboard')
    })

    }
}
module.exports = DepartmentController;