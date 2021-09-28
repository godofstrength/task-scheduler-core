const Department = require('../models/Department');

const DepartmentController = {
    //department index page
    index(req, res){
        Department.findOne({where: {id: req.params.Department_id}})
        .then()
        .catch()
        res.render('pages/projectList')
    },

    createDepartment(req, res){
        // create Department
    const {title, description, code} = req.body;
    Department.create({
        created_by: req.user.id,
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