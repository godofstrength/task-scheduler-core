const Task = require('../models/Task')

const TaskController = {
    index: (req, res) => {
        res.render('pages/tasks')
    },
    createTaskPage: (req, res) => {
        res.render('pages/taskCreation')
    },

    createTask : async (req, res) => {
        const {title, description, asssignedTo, start_date, end_date, priority} = req.body;
        const project_id = req.params.project_id;
        console.log(req.user)
        const errors = []
        let start = new Date(start_date);
        let end = new Date(end_date);
        let today = new Date();
        if(today > start){
            errors.push({msg: 'start date cannot be in the past'})
        }
        if(start >= end){
            errors.push({msg: "start date should not be greater than end date" })
        }
        if(errors.count > 0){
         res.render('pages/taskCreation', {errors: errors})
        }else{
            const task = await Task.create({
                user_id: req.user.id,
                project_id: project_id,
                title: title,
                description: description,
                asssignedTo: asssignedTo,
                start_date: start,
                end_date: end,
                status: 'pending',
                priority: priority
            })
            
        }
        
    },
}

module.exports = TaskController;