const User = require('../models/').User;
const bcrypt = require('bcryptjs');
const Department = require('../models/').Department;
const Department_User = require('../models/').Department_User;
const Role_User = require('../models/').Role_User;
const {isAdmin} = require('../utils/Validator');
const Role = require('../models/').Role;
const Token = require('../models/').Token;


const AdminController = {
   async index(req, res){
       const user = await User.findByPk(req.user.id, {include: Department})
    if(req.role == 'superAdmin'){
        const departments = await Department.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
            });
        res.render('layout/dashboard', {departments: departments, role: 'SuperAdmin', user:user});
    }
    if(req.role == 'admin'){
        if(!user.Departments){
            res.redirect('/')
        }else{
            res.render('layout/dashboard', {departments: user.Departments, role: 'admin', user:user});
        }   
    }
    if(!req.role){
        res.render('layout/dashboard', {departments: user.Departments, role: 'member', user:user});
    }
        
    },


    createUser(req, res){
        const {firstname, lastname, email, password, password_confirm, department_id, role} = req.body;
        let errors = [];
        // check required fields
        if(!firstname || !lastname || !email || !password || !password_confirm || !role){
            errors.push({msg: 'please fill in all fields'})
        }
        if(!department_id){
            errors.push({msg: 'please specify a department'})
        }
        // check password match
        if(password !== password_confirm){
            errors.push({msg: 'passwords do not match'})
        }
        // check password length
        if(password.length < 6){
            errors.push({msg: 'password should be at least 6 characters'})
        }
        if(errors.length > 0){
           res.redirect('/dashboard')
        }else{
            //  check if user already exist
            User.findOne({where: {email: email}})
            .then(user => {
                if(user){
                    errors.push({msg: 'Email is already registered'})
                    req.flash('info', errors[0].msg)
                    res.redirect('/dashboard')
                }else{
                    const newUser = User.build({
                        firstname: firstname,
                        lastname: lastname,
                        email : email,
                        password: password
                    });
                    // hash password
                    bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user =>{
                            Department_User.create({
                                user_id: user.id,
                                department_id: department_id,
                                role: role
                            })
                            .then(result => {
                                Role_User.create({
                                    user_id: user.id,
                                    role_id: role
                                })
                               res.redirect('/dashboard')
                            })
                            .catch(err=> {
                               res.redirect('/dashboard')
                            })
                            })
                        .catch(err => console.log(err));
                    }))
                }
            })
    }
},

    async allUsers(req, res){
        if(req.role == "superAdmin"){
            const user = await User.findOne({where: {id: req.user.id}})
            const users = await User.findAll({
                limit : 15
            })
    
            res.render('layout/allusers', {users: users, role: req.role, user: user})
        }else{
            req.flash('error_msg', 'Unauthorized');
            res.redirect('/dashboard');
        }
       
    },

    makeAdmin(req, res){
    
        if(req.role == 1 || req.role == 2){
            const user_id = isNaN(req.body.user_id) || !req.body.user_id ? false : req.body.user_id;
            if(user_id){
                Department_User.update(
                    {role: 2},
                    {where: {
                        id: user_id,
                        department_id: req.params.department_id
                    }}
                ).then(result => {
                    console.log('success');
                    req.flash('success_msg', 'successful');
                    res.redirect('back');
                    // res.redirect(`/${department_id}/manage-users`);
                }).catch((err) => {
                    console.log('error: '+ err.msg)
                    req.flash('error_msg', 'unable to perform request');
                    res.redirect('back');
                })
            }
        }else{
            req.flash('error_msg', 'Unauthorized');
            res.redirect('/dashboard');
        }
    },
     
    unmakeAdmin(req, res){
        if(req.role == 1 || req.role == 2){
            const user_id = isNaN(req.body.user_id) || !req.body.user_id ? false : req.body.user_id;
            if(user_id){
                Department_User.update(
                    {role: 3},
                    {where: {
                        user_id : user_id,
                        department_id : req.params.department_id
                    }
                }
                ).then(result => {
                    req.flash('success_msg', 'successful');
                    res.redirect(`/${department_id}/manage-users`)
                }).catch((err) => {
                    req.flash('error_msg', 'unable to perform request');
                    res.redirect('back');
                })
            }
        }else{
            req.flash('error_msg', 'Unauthorized');
            res.redirect('/');
        }
    },

    removeUser : async(req, res)=> {
        if(req.role == 1 || req.role == 2){
            const user_id = isNaN(req.body.user_id) || !req.body.user_id ? false : req.body.user_id;
            if(user_id){
                Department_User.destroy({
                    where : {
                        user_id: user_id,
                        department_id: req.params.department_id
                    }
                }).then(result => {
                    req.flash('success_msg', 'successful');
                    res.redirect(`/${department_id}/manage-users`)
                }).catch((err) => {
                    req.flash('error_msg', 'unable to perform request');
                    res.redirect('back');
                })
            }
        }else{
            req.flash('error_msg', 'Unauthorized');
            res.redirect('/dashboard');
        }
    }
 
 


};

module.exports = AdminController