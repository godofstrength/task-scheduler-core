const {check, body, validationResult} = require('express-validator');
const User = require('../models/').User
const Role_User = require('../models/').Role_User;
const Role = require('../models/').Role
const Department = require('../models/').Department;


const  createDepartmentValidation = () =>{
     return[
         body('title', 'department title is required').exists({checkFalsy: true}).notEmpty(),
         body('description', 'department description is required').exists({checkFalsy: true}).notEmpty(),
         body('code', 'department code is required').notEmpty()
     ]
 }
    const validate =(req, res, next)=>{
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ message: err.msg }))

        res.json({
            statusCode: 400,
            errors: extractedErrors
        })
    }
    const isAdmin = async(req,res, next) => {
        const user = await User.findOne({where: {id: req.user.id}})

        const userRole = await Role_User.findOne({where: {user_id: user.id}})
        if(userRole.role_id == 1){
            req.role = 'superAdmin'
            return next()
        }
        if(userRole.role_id == 2){
            req.role = 'admin'
            return next()
        }else{
            return next()
        }
    }
    const isSuperAdmin = async(req,res, next) => {
     

        const userRole = await Role_User.findOne({where: {user_id: user.id}})
        if(userRole.role_id == 1){
            req.role = 'superAdmin'
            return next()
        }
        else{
            req.flash('error_msg', 'unauthorized')
            res.redirect('back')
        }
    }
    // checks if user is in a department
    const isMember = async (req, res, next) => {
        const department_id = isNaN(req.params.department_id) || req.params.department_id == null ? false :
            req.params.department_id;
        if (department_id) {
            // find the user
            const user = await User.findOne({
                where: { id: req.user.id },
                include: {
                    model: Department
                }
            })
            // find the department
            const department = await Department.findOne({
                where: { id: department_id },
            });
            if (department) {
                let exist = user.Departments.find(result => result.id == department.id)
                if(exist){
                    req.role = exist.Department_User.role;
                    return next();
                } else {
                req.flash('error_msg', 'Unauthorized')
                res.redirect('/dashboard')
            }  
            } else {
                res.render('pages/404');
            }
        } else {
            res.render('pages/404');
        }




    }
module.exports = {
    createDepartmentValidation,
    validate,
    isAdmin,
    isSuperAdmin,
    isMember,
}