const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Department = require('../models/Department');
const sequelize = require('../config/connection');
const Department_User = require('../models/Department_User');

const AdminController = {
   async index(req, res){
    // if user is admin
        const departments = await Department.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });

    // else
        res.render('layout/dashboard', {departments: departments});
    },

    userCreation(req, res){
        res.render('pages/userCreation');
    },

    createUser(req, res){
        const {firstname, lastname, email, password, password_confirm, department_id} = req.body;
        let errors = [];
        // check required fields
        if(!firstname || !lastname || !email || !password || !password_confirm){
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
            res.json({
                error: errors
            });
            // res.render('register', {
            //     errors,
            //     email
            // })
        }else{
            //  check if user already exist
            User.findOne({where: {email: email}})
            .then(user => {
                if(user){
                    // user exist
                    errors.push({msg: 'Email is already registered'})
                    // res.json({
                    //     errors: errors
                    // })
                    res.render('pages/userCreation', {
                        errors,
                        email
                    })
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
                                role: 1
                            })
                            .then(result => {
                                res.render('pages/userCreation', {success_msg: 'user created successfully'})
                            })
                            .catch(err=> {
                                res.render('pages/userCreation', {error_msg: err.msg})
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