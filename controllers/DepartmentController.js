const Department = require('../models/Department');

const DepartmentController = {
    //department index page
    index(req, res){
        res.render('pages/department')
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
        res.render('layout/dashboard',{success_msg: 'Department created'});
    })
    .catch(err => {
        res.render('layout/dashboard', {error_msg: 'Unable to perform request'})
    })

    }
}
module.exports = DepartmentController;