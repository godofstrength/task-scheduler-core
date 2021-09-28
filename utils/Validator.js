const {check, body, validationResult} = require('express-validator');

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
module.exports = {
    createDepartmentValidation,
    validate
}