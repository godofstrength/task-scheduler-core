const User = require('../models/User');
const bcrypt = require('bcryptjs');

const AdminController = {
    index(req, res){
        res.render('pages/admin')
    },

   
    createUser(req, res){
        const {email, password, password_confirm} = req.body;
        let errors = [];
        // check required fields
        if(!email || !password || !password_confirm){
            errors.push({msg: 'please fill in all fields'})
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
                    res.json({
                        errors: errors
                    })
                    // res.render('register', {
                    //     errors,
                    //     email
                    // })
                }else{
                    const newUser = User.build({
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
                            res.json({
                                message: 'user created'
                            })
                            // req.flash('success_msg', 'You are now registered')
                            // res.redirect('/login')
                        })
                        .catch(err => console.log(err));
                    }))
                }
            })
    }
},
    userCreation(req, res){
        res.render('pages/userCreation');
    }

};

module.exports = AdminController