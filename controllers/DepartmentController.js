const Department = require('../models/').Department;
const Project = require('../models/').Project;
const Department_User = require('../models/').Department_User;
const Task = require('../models/').Task;
const User = require('../models/').User


const DepartmentController = {
    async index(req, res) {
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
                    const projects = await Project.findAll({
                        where: { department_id: department.id }
                    })
                    const users = await department.getUsers();
                    users.shift()
                    res.render('layout/pdashboard', { projects: projects, department: department, users: users })
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




    },

    createDepartment(req, res) {
        // create Department
        const { title, description, code } = req.body;
        Department.create({
            title: title,
            description: description,
            code: code.toUpperCase(),
        })
            .then(result => {
                //add user that creates the department as admin
                Department_User.create({
                    user_id: req.user.id,
                    department_id: result.id,
                    role: 1
                })
                    .then(result => {
                        req.flash('success_msg', 'department created successfully')
                        res.redirect('/dashboard');
                    })
                    .catch(err => {
                        console.log(err.msg)
                    })

            })
            .catch(err => {
                req.flash('error_msg', 'unable to perform request')
                res.redirect('/dashboard')
            })

    },

    manageUsers : async(req, res) => {
        // make user user is admin
       const department = await Department.findOne({
           where: {id: req.params.department_id}
        });
        const users = await department.getUsers({
            attributes: ['id', 'firstname', 'lastname']
        });
        users.shift();

        res.render('layout/members', {users : users, department: department})
    },

    // add user to a department
        addUser : async(req, res) => {
        if(req.role == 'superAdmin'){
            const user_id = parseInt(req.body.user)
            const department_id = parseInt(req.body.department)
            Department_User.create({
                user_id: user_id,
                department_id: department_id,
                role: 1
            })
            .then(result => {
                req.flash('success_msg', 'Success')
                res.redirect(`/${user_id}`/profile)
            }).catch()
        }else{
            req.flash('error_msg', 'Unauthorized');
            res.redirect('/dashboard');
        }
      
    }
}
module.exports = DepartmentController;