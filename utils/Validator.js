const {check, body, validationResult} = require('express-validator');

const  createWorkspaceValidation = () =>{
     return[
         body('title', 'workspace title is required').exists({checkFalsy: true}).notEmpty(),
         body('description', 'workspace title is required').exists({checkFalsy: true}).notEmpty(),
         body('logo').optional()
     ]
 }
    const validate =(req, res, next)=>{
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ msg: err.msg }))

        // console.log(errors.array());

        res.json({
            statusCode: 400,
            errors: extractedErrors
        })
    }
module.exports = {
    createWorkspaceValidation,
    validate
}