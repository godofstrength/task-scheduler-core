require('dotenv').config()
const Task = require('../models/').Task;
const Project = require('../models/').Project;
const Department = require('../models').Department
const User = require('../models/').User;
const Notification = require('../models/').Notification
const sequelize = require('../config/connection');
const sendMail = require('../utils/SendMail')

const TaskController = {
    index: async (req, res) => {
        // find the project
        const project = await Project.findOne({
            where: { id: req.params.project_id },
            attributes: ['id', 'department_id', 'title']
        })
        // find the department 
        const department = await Department.findOne({
            where: { id: project.department_id },
            include: [{
                model: User
            }]
        });
        const users = department.Users
        // find all tasks belonging to the project
        const tasks = await Task.findAll({ where: { project_id: project.id } })
        res.render('layout/taskdashboard', {tasks: tasks, project: project, users: users, department: department})
    },


    createTask: async (req, res) => {
        const { title, description, assignedTo, end_date, project_id } = req.body;
        const errors = []
        let end = new Date(end_date);
        let today = new Date();
        if (today > end) {
            errors.push({ msg: 'End date cannot be in the past' })
        }
        if (errors.count > 0) {
            req.flash('error_msg', errors[0].msg)
            console.log(errors)
            res.redirect('/' + project_id + '/tasks')
        } else {
            try {
                const result = await sequelize.transaction(async (t) => {
                    const task = await Task.create({
                        user_id: req.user.id,
                        project_id: parseInt(project_id),
                        title: title,
                        description: description,
                        assignedTo: parseInt(assignedTo),
                        status: 'pending'
                    }, { transaction: t })

                    await Notification.create({
                        user_id: assignedTo,
                        title: `New task from ${req.user.firstname}`,
                        created_by : req.user.id,
                        read: false,
                    }, { transaction: t })

                    return task;
                })


                // If the execution reaches this line, the transaction has been committed successfully
                // notify the assigned user
                // find the user
                if(result){
                    const recipient = await User.findbyPk(parseInt(assignedTo), { attributes: ['email', 'firstname'] })
                    console.log(recipient)
                    if (recipient) {
                        // if user exist send the mail
                        let messageBody = `<p>Hello ${recipient.firstname}</p>
                <p>You have a new Task. </p>
                    Regards <br/>
                    Task Scheduler Core<br/>
                    Email: support@taskschedulercore.com
                </p>`
                        let subject = 'Mail from Task_scheduler_core'
                        console.log(recipient.email)
                        await sendMail(recipient.email, subject, messageBody, (err, info) => {
                            if (err) {
                                req.flash('error_message');
                                res.redirect('/' + project_id + '/tasks')
                            } else {
                                req.flash('success_msg', 'Task created and user notified successfully')
                                res.redirect('/' + project_id + '/tasks')
                            }
                        })
                    }
    
                    else {
                        req.flash('error_msg', 'unable to send mail')
                    }
    
                    req.flash('success_msg', 'task created successfully')
                    res.redirect('/' + project_id + '/tasks')
                }
               
            } catch (error) {
                // If the execution reaches this line, an error occurred.
                // The transaction has already been rolled back automatically by Sequelize!
                req.flash('error_msg', 'unable to create task')
                res.redirect('/' + project_id + '/tasks')
            }


        }

    },

    myTasks: async(req, res) => {
        const myTasks = await Task.findAll({
            where: {assignedTo: req.user.id},
            attributes: ['id', 'title', 'description', 'status']
        })

        res.render('layout/yourtasks', {tasks: myTasks})
    },

    startTask: (req, res) => {
        let updateValues = {status: 'ongoing'}
        Task.update(updateValues, {where: {id: req.params.task_id}})
        .then(result => {
            req.flash('success_msg', 'success')
            res.redirect('back')
        })
        .catch(error =>{
            req.flash('error_msg', error.msg)
            res.redirect('back')
        })
    },
   completeTask: (req, res) => {
        let updateValues = {status: 'completed'}
        Task.update(updateValues, {where: {id: req.params.task_id}})
        .then(result => {
            req.flash('success_msg', 'success')
            res.redirect('back')
        })
        .catch(error =>{
            req.flash('error_msg', error.msg)
            res.redirect('back')
        })
    }
}

module.exports = TaskController;