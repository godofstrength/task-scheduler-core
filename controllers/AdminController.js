const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Department = require('../models/Department');
const sequelize = require('../config/connection');
const Department_User = require('../models/Department_User');

const AdminController = {
   async index(req, res){
        const user = await User.findOne({
            where: {id: req.user.id}
             })

            const departments = await Department.findAll({
                attributes: {exclude: ['createdAt', 'updatedAt']}
            });
       
    // else
        res.render('layout/dashboard', {departments: departments});
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
            res.json({
                error: errors
            });
        }else{
            //  check if user already exist
            User.findOne({where: {email: email}})
            .then(user => {
                if(user){
                    errors.push({msg: 'Email is already registered'})
                    res.render('layout/dashboard', {
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
                                role: role
                            })
                            .then(result => {
                                res.render('layout/dashboard', {success_msg: 'user created successfully'})
                            })
                            .catch(err=> {
                                res.render('layout/dashboard', {error_msg: err.msg})
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