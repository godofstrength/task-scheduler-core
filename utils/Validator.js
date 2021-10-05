const {check, body, validationResult} = require('express-validator');
const User = require('../models/').User
const Role_User = require('../models/').Role_User;
const Role = require('../models/').Role


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
module.exports = {
    createDepartmentValidation,
    validate,
    isAdmin
}