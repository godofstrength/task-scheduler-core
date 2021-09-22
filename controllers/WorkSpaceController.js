const Workspace = require('../models/Workspace');

const WorkspaceController = {
    createworkspace(req, res){
       res.json({
           message: 'test'
       })
    }
}
module.exports = WorkspaceController