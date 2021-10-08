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
        res.render('layout/dashboard', {departments: departments, role: 'SuperAdmin'});
    }
    if(req.role == 'admin'){
        if(!user.Departments){
            res.redirect('/')
        }else{
            res.render('layout/dashboard', {departments: user.Departments, role: 'admin'});
        }   
    }
    if(!req.role){
        res.render('layout/dashboard', {departments: user.Departments, role: 'member'});
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

 
 


};

module.exports = AdminController