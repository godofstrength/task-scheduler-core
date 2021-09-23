const Department = require('../models/Department');

const DepartmentController = {
    createworkspace(req, res){
        // create Department and add user to the workspace_users table
    const {title, description} = req.body;
    Department.create({

    })
    }
}
module.exports = WorkspaceController